const path = require("path");
const readline = require("readline");
const {
  createFile,
  deleteFile,
  readFileContent,
  renameFile,
} = require("./fileOperations");
const {
  createDirectory,
  isValidDirectoryName,
  updateDirectoryName,
  deleteDirectory,
  listDirectoryContents,
} = require("./directoryOperations");
const { displayMenu } = require("./menu");
const {
  createRecord,
  createSchema,
  readCSVFile,
  deleteRecord,
  updateRecord,
  readRecord,
} = require("./recordOperations");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Function to process user input based on selected menu option
function processUserInput() {
  displayMenu();
  rl.question("\nEnter your choice: \n\n", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter directory name: ", (answer) => {
          const trimmedAnswer = answer.trim();
          if (!trimmedAnswer) {
            console.error("Error: Please enter a directory name.");
            processUserInput();
            return;
          }
          if (!isValidDirectoryName(trimmedAnswer)) {
            console.error(
              "Error: Directory name should start with an alphabet."
            );
            processUserInput();
            return;
          }
          const directoryPath = path.join(__dirname, trimmedAnswer);
          createDirectory(directoryPath);
          processUserInput();
        });
        break;
      case "2":
        rl.question("Enter old directory name: ", (oldName) => {
          rl.question("Enter new directory name: ", (newName) => {
            const trimmedOldName = oldName.trim();
            const trimmedNewName = newName.trim();
            if (!trimmedOldName || !trimmedNewName) {
              console.error(
                "Error: Please enter both old and new directory names."
              );
              processUserInput();
              return;
            }
            const oldPath = path.join(__dirname, trimmedOldName);
            updateDirectoryName(oldPath, trimmedNewName);
            processUserInput();
          });
        });
        break;
      case "3":
        rl.question("Enter directory name to delete: ", (dirName) => {
          const trimmedDirName = dirName.trim();
          if (!trimmedDirName) {
            console.error("Error: Please enter a directory name.");
            processUserInput();
            return;
          }
          const directoryPath = path.join(__dirname, trimmedDirName);
          deleteDirectory(directoryPath);
          processUserInput();
        });
        break;
      case "4":
        rl.question("Enter directory name to list contents: ", (dirName) => {
          const trimmedDirName = dirName.trim();
          if (!trimmedDirName) {
            console.error("Error: Please enter a directory name.");
            processUserInput();
            return;
          }
          const directoryPath = path.join(__dirname, trimmedDirName);
          listDirectoryContents(directoryPath);
          processUserInput();
        });
        break;
      case "5":
        rl.question(
          "Enter directory name where you want to create file: ",
          (dirName) => {
            rl.question("Enter file name: ", (fileName) => {
              const trimmedDirName = dirName.trim();
              const trimmedFileName = fileName.trim();
              if (!trimmedDirName || !trimmedFileName) {
                console.error(
                  "Error: Please enter both directory and file names."
                );
                processUserInput();
                return;
              }
              const directoryPath = path.join(__dirname, trimmedDirName);
              createFile(directoryPath, trimmedFileName);
              processUserInput();
            });
          }
        );
        break;
      case "6":
        rl.question(
          "Enter directory name where the file is located: ",
          (dirName) => {
            rl.question("Enter file name to delete: ", (fileName) => {
              const trimmedDirName = dirName.trim();
              const trimmedFileName = fileName.trim();
              if (!trimmedDirName || !trimmedFileName) {
                console.error(
                  "Error: Please enter both directory and file names."
                );
                processUserInput();
                return;
              }
              const directoryPath = path.join(__dirname, trimmedDirName);
              const filePath = path.join(directoryPath, trimmedFileName);
              deleteFile(filePath, directoryPath, processUserInput); // Pass processUserInput as the callback
            });
          }
        );
        break;
      case "7":
        rl.question(
          "Enter directory name where the file is located: ",
          (dirName) => {
            rl.question("Enter file name to read: ", (fileName) => {
              const trimmedDirName = dirName.trim();
              const trimmedFileName = fileName.trim();
              if (!trimmedDirName || !trimmedFileName) {
                console.error(
                  "Error: Please enter both directory and file names."
                );
                processUserInput();
                return;
              }
              const directoryPath = path.join(__dirname, trimmedDirName);
              const filePath = path.join(directoryPath, trimmedFileName);
              readFileContent(filePath, (content) => {
                if (content !== null) {
                  console.log(`Content of file "${trimmedFileName}":`);
                  console.log(content);
                }
                processUserInput();
              });
            });
          }
        );
        break;
      case "8":
        rl.question(
          "Enter directory name where the file is located: ",
          (dirName) => {
            rl.question("Enter old file name: ", (oldFileName) => {
              rl.question("Enter new file name: ", (newFileName) => {
                const trimmedDirName = dirName.trim();
                const trimmedOldFileName = oldFileName.trim();
                const trimmedNewFileName = newFileName.trim();
                if (
                  !trimmedDirName ||
                  !trimmedOldFileName ||
                  !trimmedNewFileName
                ) {
                  console.error(
                    "Error: Please enter directory, old file name, and new file name."
                  );
                  processUserInput();
                  return;
                }
                const directoryPath = path.join(__dirname, trimmedDirName);
                renameFile(
                  directoryPath,
                  trimmedOldFileName,
                  trimmedNewFileName,
                  processUserInput
                );
              });
            });
          }
        );
        break;
      case "9":
        rl.question(
          "Enter directory name where the file is located: ",
          (dirName) => {
            rl.question("Enter file name: ", (fileName) => {
              rl.question("Enter schema : ", (schema) => {
                const trimmedDirName = dirName.trim();
                const trimmedFileName = fileName.trim();
                const trimmedSchema = schema.trim();
                if (!trimmedDirName || !trimmedFileName || !trimmedSchema) {
                  console.error(
                    "Error: Please enter valid directory name, file name, and schema."
                  );
                  processUserInput();
                  return;
                }
                const directoryPath = path.join(__dirname, trimmedDirName);
                createSchema(directoryPath, fileName, schema);
                processUserInput();
              });
            });
          }
        );
        break;
      case "10":
        rl.question("Enter directory name: ", (dirName) => {
          rl.question("Enter file name: ", (fileName) => {
            rl.question(
              "Enter record values separated by commas: ",
              (recordValues) => {
                const trimmedDirName = dirName.trim();
                const trimmedFileName = fileName.trim();
                const trimmedRecordValues = recordValues.trim();
                if (
                  !trimmedDirName ||
                  !trimmedFileName ||
                  !trimmedRecordValues
                ) {
                  console.error(
                    "Error: Please enter valid directory name, file name, and record values."
                  );
                  processUserInput();
                  return;
                }
                const directoryPath = path.join(__dirname, trimmedDirName);
                createRecord(directoryPath, fileName, recordValues);
                processUserInput();
              }
            );
          });
        });
        break;
      case "11":
        // Ask for directory first
        rl.question("Enter directory path: ", (directoryPath) => {
          // Ask for file path within the directory
          rl.question("Enter file name: ", (fileName) => {
            const filePath = path.join(directoryPath, fileName);
            readCSVFile(filePath);
            processUserInput(); // Continue with the menu after displaying the CSV content
          });
        });
        break;
      case "12":
        // Read a particular record
        rl.question("Enter directory name: ", (directoryName) => {
          rl.question("Enter file name: ", (fileName) => {
            rl.question("Enter record ID: ", (recordId) => {
              readRecord(directoryName, fileName, recordId);
              processUserInput();
            });
          });
        });
        break;
      case "13":
        // Delete a particular record
        rl.question("Enter directory name: ", (directoryName) => {
          rl.question("Enter file name: ", (fileName) => {
            rl.question("Enter primary key prefix to delete the record: ", (primaryKeyPrefix) => {
              deleteRecord(directoryName, fileName, primaryKeyPrefix);
              processUserInput();
            });
          });
        });
        break;


        case "14":
        // Read a particular record
        rl.question("Enter directory name: ", (directoryName) => {
          rl.question("Enter file name: ", (fileName) => {
            rl.question("Enter record ID: ", (recordId) => {
              rl.question("Enter Updated Values: ", (updatedValues)=>{
                updateRecord(directoryName, fileName, recordId, updatedValues);
                processUserInput();
              });
            });
          });
        });
        break;
      case "0":
        rl.close();
        break;
      default:
        console.log("Invalid choice.");
        processUserInput();
    }
  });
}

 // Start processing user input
processUserInput();

rl.on("close", () => { // Event handler for readline close event
  console.log("Exiting...");
  process.exit(0); // Exit the process
});

