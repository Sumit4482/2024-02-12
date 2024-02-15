const fs = require('fs');
const path = require('path'); 

/**
 * Function to create a directory.
 * 
 * @param {string} dirPath - The path of the directory to create.
 * @returns {Promise<void>} - A Promise that resolves when the directory is successfully created, or rejects with an error if the directory already exists or if an error occurs during creation.
 */
function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dirPath)) {
      console.log(`Directory "${dirPath}" already exists.`);
      return reject(new Error("Directory already exists"));
    }
    fs.mkdir(dirPath, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        reject(err);
      } else {
        console.log(`Directory "${dirPath}" created successfully.`);
        resolve();
      }
    });
  });
}

/**
 * Function to check if a directory name is valid.
 * 
 * @param {string} name - The directory name to validate.
 * @returns {boolean} - Returns true if the directory name starts with an alphabet, otherwise returns false.
 */
function isValidDirectoryName(name) {
  return /^[A-Za-z]/.test(name); // Check if the directory name starts with an alphabet
}

/**
 * Function to update the name of a directory.
 * 
 * @param {string} oldPath - The current path of the directory.
 * @param {string} newName - The new name for the directory.
 */
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

/**
 * Function to delete a directory.
 * 
 * @param {string} dirPath - The path of the directory to delete.
 */

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

/**
 * Function to list the contents of a directory.
 * 
 * @param {string} dirPath - The path of the directory to list the contents of.
 */
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

// Export the functions to make them available from other modules
module.exports = {
  createDirectory,
  isValidDirectoryName,
  updateDirectoryName,
  deleteDirectory,
  listDirectoryContents
};
