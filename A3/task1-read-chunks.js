const fs = require("fs");
const filePath = process.argv[2] || "./big.txt";
// Create a readable stream
const readStream = fs.createReadStream(filePath, {
  encoding: "utf8",
  highWaterMark: 16 * 1024,
});
let chunkCount = 0;
readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`\n--- Chunk ${chunkCount} ---`);
  console.log(chunk);
});
readStream.on("end", () => {
  console.log(`\n✓ Finished reading file. Total chunks: ${chunkCount}`);
});
readStream.on("error", (error) => {
  console.error("Error reading file:", error.message);
});
