const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");
const inputFile = process.argv[2] || "./data.txt";
const outputFile = process.argv[3] || "./data.txt.gz";
// Create streams
const readStream = fs.createReadStream(inputFile);
const gzip = zlib.createGzip();
const writeStream = fs.createWriteStream(outputFile);
// Use pipeline to handle the stream flow
pipeline(readStream, gzip, writeStream, (error) => {
  if (error) {
    console.error("Pipeline failed:", error.message);
  } else {
    console.log(
      `✓ File compressed successfully: ${inputFile} -> ${outputFile}`
    );
  }
});
