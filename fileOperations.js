const fs = require('fs'); 
const path = require('path');

// Function to create a directory
function createDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Directory "${dirPath}" already exists.`); // Print a message if the directory already exists
    return;
  }

  // Create the directory recursively
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err); // Log an error message if directory creation fails
    } else {
      console.log(`Directory "${dirPath}" created successfully.`); // Log a success message if directory creation succeeds
    }
  });
}

// Function to check if a directory name is valid
function isValidDirectoryName(name) {
  return /^[A-Za-z]/.test(name); // Check if the directory name starts with an alphabet
}

// Function to update a directory name
function updateDirectoryName(oldPath, newName) {
  if (!fs.existsSync(oldPath)) {
    console.error(`Directory "${oldPath}" does not exist.`); // Log an error if the old directory does not exist
    return;
  }

  if (!isValidDirectoryName(newName)) {
    console.error('Error: New directory name should start with an alphabet.'); // Log an error if the new directory name is invalid
    return;
  }

  const newPath = path.join(path.dirname(oldPath), newName); // Generate the new path

  // Rename the directory
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('Error renaming directory:', err); // Log an error message if directory renaming fails
    } else {
      console.log(`Directory "${oldPath}" renamed to "${newPath}" successfully.`); // Log a success message if directory renaming succeeds
    }
  });
}

// Function to delete a directory
function deleteDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory "${dirPath}" does not exist.`); // Log an error if the directory does not exist
    return;
  }

  // Delete the directory recursively
  fs.rmdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error deleting directory:', err); // Log an error message if directory deletion fails
    } else {
      console.log(`Directory "${dirPath}" deleted successfully.`); // Log a success message if directory deletion succeeds
    }
  });
}

// Function to list the contents of a directory
function listDirectoryContents(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err); // Log an error message if directory reading fails
    } else {
      console.log(`Contents of directory "${dirPath}":`); // Log the directory path
      files.forEach((file) => {
        console.log(file); // Log each file in the directory
      });
    }
  });
}

// Export the functions to make them accessible from other modules
module.exports = {
  createDirectory,
  isValidDirectoryName,
  updateDirectoryName,
  deleteDirectory,
  listDirectoryContents
};
