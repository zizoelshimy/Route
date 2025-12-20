const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");
// Helper function to initialize users file if it doesn't exist
async function initUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify({}, null, 2));
  }
}
// Helper function to read users from JSON file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}
// Helper function to write users to JSON file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
// Helper function to parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}
// Helper function to send JSON response
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
// Create HTTP server
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  try {
    // POST /user
    if (method === "POST" && url === "/user") {
      const body = await parseBody(req);
      const users = await readUsers();

      // Check if email already exists
      const emailExists = Object.values(users).some(
        (user) => user.email === body.email
      );

      if (emailExists) {
        sendResponse(res, 400, { message: "Email already exists." });
        return;
      }
      // Generate new ID
      const ids = Object.keys(users).map(Number);
      const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
      // Add new user
      users[newId] = {
        id: newId,
        name: body.name,
        age: body.age,
        email: body.email,
      };
      await writeUsers(users);
      sendResponse(res, 201, { message: "User added successfully." });
      return;
    }
    // PATCH
    if (method === "PATCH" && url.startsWith("/user/")) {
      const id = url.split("/")[2];
      const body = await parseBody(req);
      const users = await readUsers();

      if (!users[id]) {
        sendResponse(res, 404, { message: "User ID not found." });
        return;
      }
      // Update user fields
      if (body.name !== undefined) users[id].name = body.name;
      if (body.age !== undefined) users[id].age = body.age;
      if (body.email !== undefined) users[id].email = body.email;

      await writeUsers(users);
      sendResponse(res, 200, { message: "User age updated successfully." });
      return;
    }
    // DELETE
    if (method === "DELETE" && url.startsWith("/user/")) {
      const id = url.split("/")[2];
      const users = await readUsers();

      if (!users[id]) {
        sendResponse(res, 404, { message: "User ID not found." });
        return;
      }
      delete users[id];
      await writeUsers(users);
      sendResponse(res, 200, { message: "User deleted successfully." });
      return;
    }
    // GET /user
    if (method === "GET" && url === "/user") {
      const users = await readUsers();
      const usersArray = Object.values(users);
      sendResponse(res, 200, usersArray);
      return;
    }
    // GET /user/:id
    if (method === "GET" && url.startsWith("/user/")) {
      const id = url.split("/")[2];
      const users = await readUsers();
      if (!users[id]) {
        sendResponse(res, 404, { message: "User not found." });
        return;
      }
      sendResponse(res, 200, users[id]);
      return;
    }
    // Route not found
    sendResponse(res, 404, { message: "Route not found" });
  } catch (error) {
    console.error("Error:", error);
    sendResponse(res, 500, { message: "Internal server error" });
  }
});
// Start server
async function startServer() {
  await initUsersFile();
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("\nAvailable endpoints:");
    console.log("POST   /user       - Add a new user");
    console.log("PATCH  /user/:id   - Update user by ID");
    console.log("DELETE /user/:id   - Delete user by ID");
    console.log("GET    /user       - Get all users");
    console.log("GET    /user/:id   - Get user by ID");
  });
}
startServer();