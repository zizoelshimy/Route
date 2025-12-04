//1st Q
function logcurrentFilepathAndDirectory() {
  console.log("Current file path:", __filename);
  console.log("Current directory path:", __dirname);
}
logcurrentFilepathAndDirectory();
//2nd Q
function takeFilePathAndReturnFileName(filePath) {
  const path = require("path");
  return path.basename(filePath);
}
console.log(takeFilePathAndReturnFileName(__filename));
//3rd Q
function buildApathFromObject(pathObject) {
  const path = require("path");
  return path.format(pathObject);
}
const pathObject = { dir: "/folder", name: "app", ext: ".js" };
console.log(buildApathFromObject(pathObject));
//4th Q
function getFileExtension(filePath) {
  const path = require("path");
  return path.extname(filePath);
}
//Input Example: /docs/readme.md"
// Output Example: “.md”
console.log(getFileExtension("/docs/readme.md")); // Output: ".md"
//5th Q
function parthpathIntoObject(filePath) {
  const path = require("path");
  return path.parse(filePath);
}
console.log(parthpathIntoObject("/home/app/main.js"));
//6th Q
function isAbsolutePath(filePath) {
  const path = require("path");
  return path.isAbsolute(filePath);
}
console.log(isAbsolutePath("/home/user/file.txt"));
console.log(isAbsolutePath("file.txt"));
//7th Q
function joinMultiplePathSegments(...segments) {
  const path = require("path");
  return path.join(...segments);
}
console.log(joinMultiplePathSegments("src", "components", "App.js"));
//8th Q
function resolveRelativePathToAbsolute(relativePath) {
  const path = require("path");
  return path.resolve(relativePath);
}
console.log(resolveRelativePathToAbsolute("./index.js"));
//9th Q
function jointwoPaths(path1, path2) {
  const path = require("path");
  return path.resolve(path1, path2);
}
console.log(jointwoPaths("/users/documents", "file.txt"));
//10th Q
function deleteFileasync(filePath) {
  const fs = require("fs"); 
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return;
        }
        console.log("File deleted successfully.");
    });
}
deleteFileasync("/path/to/file.txt");
//11th Q
function createfoldersync(folderPath) {
  const fs = require("fs");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Folder created successfully.");
  } else {
    console.log("Folder already exists.");
  }
}
createfoldersync("./newFolder/subFolder");
//12th Q
function createEventEmitterForStart() {
  const EventEmitter = require("events");
  const eventEmitter = new EventEmitter();
  eventEmitter.on("start", () => {
    console.log("Welcome event triggered!");
  });
  eventEmitter.emit("start");
}
 console.log(createEventEmitterForStart());
//13th Q
function emitCustomLogin(username) {
  const EventEmitter = require("events");
  const eventEmitter = new EventEmitter();
  eventEmitter.on("login", (username) => {
    console.log(`User logged in: ${username}`);
  });
  eventEmitter.emit("login", username);
}
emitCustomLogin("Ahmed");
//14th Q
function ReadFilesyncAndLogContent(filePath) {
  const fs = require("fs"); 
    try {
        const data = fs.readFileSync(filePath, "utf8");
        console.log("File content:", data);
    } catch (err) {
        console.error("Error reading file:", err);
    }       
}
ReadFilesyncAndLogContent("./sample.txt");
//15th Q
//Write asynchronously to a file. (1 Grade)
//• Input: path:"./async.txt", content:"Async save"
function writeFileAsync(filePath, content) {
  const fs = require("fs"); 
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("File written successfully.");
    });
}
writeFileAsync("./async.txt", "Async save");
//16th Q
function ifdireexist(folderPath) {
    const fs = require("fs");
    if (fs.existsSync(folderPath)) {
        console.log("Directory exists.");
    } else {
        console.log("Directory does not exist.");
    }   
}
ifdireexist("./newFolder");
//17th Q
function returnOSAndCPUarticture() {
  const os = require("os");
  return {
    platform: os.platform(),
    architecture: os.arch(),
  };
}
console.log(returnOSAndCPUarticture());