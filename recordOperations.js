const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * Function to create a schema for a CSV file.
 *
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {string} fileName - The name of the CSV file.
 * @param {string} schema - The schema for the CSV file, separated by commas.
 */
function createSchema(directoryPath, fileName, schema) {
  const filePath = path.join(directoryPath, fileName + ".csv");
  const schemaColumns = schema.split(",").map((col) => col.trim());

  let header = "";

  for (let i = 0; i < schemaColumns.length; i++) {
    header += schemaColumns[i];
    if (i !== schemaColumns.length - 1) {
      header += ",";
    }
  }
  header += "\n";

  fs.appendFile(filePath, header, "utf8", (err) => {
    if (err) {
      console.error("Error writing schema to file:", err);
    } else {
      console.log("Schema written to file successfully.");
    }
  });
}
/**
 * Function to create a new record in a CSV file.
 *
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {string} fileName - The name of the CSV file.
 * @param {string} recordValues - The values of the record, separated by commas.
 */
function createRecord(directoryPath, fileName, recordValues) {
  const filePath = path.join(directoryPath, fileName + ".csv");
  const values = recordValues.split(",").map((value) => value.trim());

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create a new one with headers
    const header = "id," + values.join(",") + "\n";
    fs.writeFileSync(filePath, header);
  }

  // Generate a unique primary key for the new record
  const primaryKey = generatePrimaryKey(filePath);

  // Construct record line in CSV format
  const recordLine = primaryKey + "," + values.join(",") + "\n";

  // Append record to file
  fs.appendFileSync(filePath, recordLine, "utf8");
  console.log("Record written to file successfully.");
}


/**
 * Function to generate a unique primary key for a new record based on existing records in a CSV file.
 * 
 * @param {string} filePath - The path of the CSV file containing existing records.
 * @returns {number} - The generated primary key for the new record.
 */
function generatePrimaryKey(filePath) {
  // Read the existing records to determine the next primary key
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  let maxId = 0;

  // Find the maximum ID currently in use
  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(",");
    const id = parseInt(columns[0]);
    if (!isNaN(id) && id > maxId) {
      maxId = id;
    }
  }

  // Increment the maximum ID to generate a new primary key
  return maxId + 1;
}
/**
 * Function to update a record in a CSV file.
 *
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {string} fileName - The name of the CSV file.
 * @param {string} recordId - The ID of the record to update.
 * @param {string[]} updatedValues - The updated values of the record, separated by commas.
 */

function updateRecord(directoryPath, fileName, recordId, updatedValues) {
  const filePath = path.join(directoryPath, fileName + ".csv");

  // Read the content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the content into lines
    const lines = data.split("\n");

    // Find the record with the specified recordId
    let found = false;
    for (let i = 0; i < lines.length; i++) {
      const columns = lines[i].split(",");
      if (columns[0] === recordId) {
        // Update the record with updatedValues
        lines[i] = recordId + ',' + updatedValues + "\n"; // Assuming updatedValues is a string
        found = true;
        break;
      }
    }

    // If the record is not found
    if (!found) {
      console.error("Error: Record with specified ID not found.");
      return;
    }

    // Write the updated content back to the file
    fs.writeFile(filePath, lines.join("\n"), "utf8", (err) => {
      if (err) {
        console.error("Error updating record:", err);
      } else {
        console.log("Record updated successfully.");
      }
    });
  });
}
/**
 * Function to read the contents of a CSV file.
 *
 * @param {string} filePath - The path of the CSV file.
 */
function readCSVFile(filePath) {
  // Read the content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the content into lines
    const lines = data.trim().split("\n");

    // Extract column headers
    const headers = lines[0].split(",");

    // Initialize table with headers
    const table = [headers];

    // Extract and format data rows
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      table.push(row);
    }

    // Display table
    console.log(formatTable(table));
  });
}

/**
 * Function to format a table with aligned columns.
 * 
 * @param {string[][]} table - The table to format, represented as a 2D array of strings.
 * @returns {string} - The formatted table as a string.
 */
function formatTable(table) {
  // Determine maximum width for each column
  const columnWidths = table[0].map((_, colIndex) =>
    Math.max(...table.map((row) => row[colIndex].length))
  );

  // Generate table rows with aligned columns
  const formattedRows = table.map((row) =>
    row
      .map((value, colIndex) => value.padEnd(columnWidths[colIndex]))
      .join(" | ")
  );

  // Generate separator row
  const separator = columnWidths.map((width) => "-".repeat(width)).join("-+-");

  // Combine rows with separator
  const formattedTable = [formattedRows[0], separator, ...formattedRows.slice(1)];

  return formattedTable.join("\n");
}

/**
 * Function to read a specific record from a CSV file.
 *
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {string} fileName - The name of the CSV file.
 * @param {string} recordId - The ID of the record to read.
 */
function readRecord(directoryPath, fileName, recordId) {
  const filePath = path.join(directoryPath, fileName + ".csv");

  // Read the content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the content into lines
    const lines = data.trim().split("\n");

    // Find the record with the specified recordId
    let found = false;
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(",");
      if (columns[0] === recordId) {
        // Print the record data in table format
        console.log(formatTable([columns]));
        found = true;
        break;
      }
    }

    // If the record is not found
    if (!found) {
      console.error("Error: Record with specified ID not found.");
    }
  });
}
/**
 * Function to delete a record from a CSV file.
 *
 * @param {string} directoryPath - The directory path where the file is located.
 * @param {string} fileName - The name of the CSV file.
 */

function deleteRecord(directoryPath, fileName, primaryKeyPrefix) {
  const filePath = path.join(directoryPath, fileName + ".csv");

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log("File not found.");
    return;
  }

  // Read the contents of the file
  const fileContents = fs.readFileSync(filePath, 'utf8').trim();

  // Split the file contents into lines
  const lines = fileContents.split('\n');

  // Filter out the record(s) with the given primary key prefix
  const filteredLines = lines.filter(line => {
    const primaryKey = line.split(',')[0].charAt(0);
    return primaryKey !== primaryKeyPrefix;
  });

  // Join the filtered lines to form the updated content
  const updatedContent = filteredLines.join('\n');

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent);

  console.log("Record(s) with primary key prefix " + primaryKeyPrefix + " deleted successfully.");
}

module.exports = {
  createRecord,
  createSchema,
  deleteRecord,
  updateRecord,
  readCSVFile,
  readRecord,
};
