const fs = require("fs");
const sourceFile = process.argv[2] || "./source.txt";
const destFile = process.argv[3] || "./dest.txt";
// Create readable and writable streams
const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destFile);
// Pipe the read stream to the write stream
readStream.pipe(writeStream);
// Handle events
readStream.on("error", (error) => {
  console.error("Error reading source file:", error.message);
});
writeStream.on("error", (error) => {
  console.error("Error writing to destination file:", error.message);
});
writeStream.on("finish", () => {
  console.log(`✓ File copied successfully from ${sourceFile} to ${destFile}`);
});
