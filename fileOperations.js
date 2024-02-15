const fs = require('fs');
const path = require('path');
const readline = require('readline'); 

/**
 * Function to create a new file.
 * 
 * @param {string} directory - The directory where the file will be created.
 * @param {string} fileName - The name of the file to create.
 */
function createFile(directory, fileName) {
  const filePath = path.join(directory, fileName + '.csv');
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log(`File "${filePath}" created successfully.`);
    }
  });
}

/**
 * Function to delete a file.
 * 
 * @param {string} filePath - The path of the file to delete.
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {Function} callback - A callback function to be called after the file is deleted or deletion is canceled.
 */
function deleteFile(filePath, directoryPath, callback) {
  if (!fs.existsSync(filePath)) {
    console.error(`File "${filePath}" does not exist.`);
    callback();
    return;
  }

  const fileName = path.basename(filePath);

  // Prompt user to confirm deletion
  console.log(`Are you sure you want to delete the file "${fileName}" in directory "${directoryPath}"? (yes/no)`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('> ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log(`File "${filePath}" deleted successfully.`);
        }
        // Call the callback function to allow further actions
        callback();
      });
    } else {
      console.log('Deletion canceled.');
      // Call the callback function to allow further actions
      callback();
    }
  });
}

/**
 * Function to read the content of a file.
 * 
 * @param {string} filePath - The path of the file to read.
 * @param {Function} callback - A callback function to be called with the file content or null if an error occurs.
 */

function readFileContent(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file "${filePath}":`, err);
      callback(null);
    } else {
      callback(data);
    }
  });
}
/**
 * Function to rename a file.
 * 
 * @param {string} directoryPath - The path of the directory where the file is located.
 * @param {string} oldFileName - The name of the file to rename.
 * @param {string} newFileName - The new name for the file.
 * @param {Function} callback - A callback function to be called after the file is renamed.
 */
function renameFile(directoryPath, oldFileName, newFileName, callback) {
  const oldFilePath = path.join(directoryPath, oldFileName);
  const newFilePath = path.join(directoryPath, newFileName);

  // Check if the file exists
  if (!fs.existsSync(oldFilePath)) {
    console.error(`File "${oldFileName}" does not exist in directory "${directoryPath}".`);
    callback();
    return;
  }

  // Get the file extension
  const extension = path.extname(oldFileName);

  // Construct the new file name with the same extension
  const newFileNameWithExtension = newFileName + extension;

  // Rename the file
  fs.rename(oldFilePath, path.join(directoryPath, newFileNameWithExtension), (err) => {
    if (err) {
      console.error(`Error renaming file "${oldFileName}" to "${newFileNameWithExtension}":`, err);
    } else {
      console.log(`File "${oldFileName}" renamed to "${newFileNameWithExtension}" successfully.`);
    }
    callback();
  });
}

module.exports = {
  createFile,
  deleteFile,
  readFileContent,
  renameFile
};