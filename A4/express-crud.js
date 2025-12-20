const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, "users.json");
app.use(express.json());
//Initialize users file if not exists
async function initUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify({}, null, 2));
  }
}
//Read users
async function readUsers() {
  try {
    return JSON.parse(await fs.readFile(USERS_FILE, "utf8"));
  } catch {
    return {};
  }
}
//Write users
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
// POST /user - Add user
app.post("/user", async (req, res) => {
  const { name, age, email } = req.body;
  const users = await readUsers();
  if (Object.values(users).some((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const ids = Object.keys(users).map(Number);
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  users[newId] = { id: newId, name, age, email };
  await writeUsers(users);
  res.status(201).json({ message: "User added successfully." });
});

// PATCH /user/:id - Update user
app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const users = await readUsers();
  if (!users[id])
    return res.status(404).json({ message: "User ID not found." });
  const { name, age, email } = req.body;
  if (name !== undefined) users[id].name = name;
  if (age !== undefined) users[id].age = age;
  if (email !== undefined) users[id].email = email;
  await writeUsers(users);
  res.json({ message: "User age updated successfully." });
});

//DELETE /user/:id - Delete user
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const users = await readUsers();
  if (!users[id])
    return res.status(404).json({ message: "User ID not found." });
  delete users[id];
  await writeUsers(users);
  res.json({ message: "User deleted successfully." });
});

// GET /user/getByName 
app.get("/user/getByName", async (req, res) => {
  const { name } = req.query;
  const users = await readUsers();
  const user = Object.values(users).find((u) => u.name === name);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(user);
});
// GET /user - Get all users
app.get("/user", async (req, res) => {
  const users = await readUsers();
  res.json(Object.values(users));
});
// GET /user/filter 
app.get("/user/filter", async (req, res) => {
  const minAge = parseInt(req.query.minAge);
  const users = await readUsers();
  const filtered = Object.values(users).filter((u) => u.age >= minAge);
  if (filtered.length === 0)
    return res.status(404).json({ message: "no user found" });
  res.json(filtered);
});
//GET /user/:id - Get user by ID
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const users = await readUsers();
  if (!users[id]) return res.status(404).json({ message: "User not found." });
  res.json(users[id]);
});
// Start server
initUsersFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Express CRUD server running on http://localhost:${PORT}`);
  });
});
