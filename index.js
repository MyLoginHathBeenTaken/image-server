const fs = require('fs');
const { createHash } = require('node:crypto');
const express = require('express');
const app = express()
const multer = require('multer');
const port = 4444;
const path = './uploads'
// Configure Multer storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

function sha1Hash(buf) {
  // Ensure the input is a Buffer.
  if (!Buffer.isBuffer(buf)) {
    throw new Error("Input must be a Buffer.");
  }
  // Create a SHA-1 hash object.
  const hash = createHash('sha1');

  // Update the hash content with the input buffer.
  hash.update(buf);

  // Calculate the digest and return it as a hexadecimal string.
  return hash.digest('hex');
}

function writeBufferToFile(filePath, buffer) {
  // Import the 'fs' (file system) module, which provides methods for interacting with the file system.
  const fs = require('fs');

  // Ensure the input is a Buffer.
  if (!Buffer.isBuffer(buffer)) {
    return Promise.reject(new Error("Input 'buffer' must be a Buffer."));
  }

  // Ensure the file path is a string.
  if (typeof filePath !== 'string' || filePath.trim() === '') {
    return Promise.reject(new Error("Input 'filePath' must be a non-empty string."));
  }

  // Use fs.writeFile to write the buffer to the file.
  // It returns a Promise, making it easy to handle asynchronous operations.
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        // If an error occurs during writing, reject the Promise.
        reject(new Error(`Failed to write buffer to file '${filePath}': ${err.message}`));
      } else {
        // If the write is successful, resolve the Promise.
        resolve();
      }
    });
  });
}

app.post('/upload', upload.single('uploadedFile'), async (req, res) => {
  let hash = sha1Hash(req.file.buffer)
  writeBufferToFile(`${path}/${req.file.originalname.replace(/.*(?=\.)/, hash)}`, req.file.buffer)
  res.status(201).json({ hash : `${req.file.originalname.replace(/.*(?=\.)/, hash)}`});
  console.log(hash, req.body.someData)
});

//write suc endpoint

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
