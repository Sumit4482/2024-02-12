const fs = require('fs');
const path = require('path');

function createDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Directory "${dirPath}" already exists.`);
    return;
  }

  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
    } else {
      console.log(`Directory "${dirPath}" created successfully.`);
    }
  });
}

function isValidDirectoryName(name) {
  return /^[A-Za-z]/.test(name);
}

function updateDirectoryName(oldPath, newName) {
  if (!fs.existsSync(oldPath)) {
    console.error(`Directory "${oldPath}" does not exist.`);
    return;
  }

  if (!isValidDirectoryName(newName)) {
    console.error('Error: New directory name should start with an alphabet.');
    return;
  }

  const newPath = path.join(path.dirname(oldPath), newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('Error renaming directory:', err);
    } else {
      console.log(`Directory "${oldPath}" renamed to "${newPath}" successfully.`);
    }
  });
}

function deleteDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory "${dirPath}" does not exist.`);
    return;
  }

  fs.rmdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error deleting directory:', err);
    } else {
      console.log(`Directory "${dirPath}" deleted successfully.`);
    }
  });
}

function listDirectoryContents(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
    } else {
      console.log(`Contents of directory "${dirPath}":`);
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
}

module.exports = {
  createDirectory,
  isValidDirectoryName,
  updateDirectoryName,
  deleteDirectory,
  listDirectoryContents
};
