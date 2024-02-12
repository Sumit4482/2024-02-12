const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function deleteRecord(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName + ".csv");

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error("Error: File does not exist.");
    return;
  }

  // Delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting record:", err);
    } else {
      console.log("Record deleted successfully.");
    }
    // ProcessUserInput not called here
  });
}

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
        lines[i] = updatedValues.join(",") + "\n";
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



module.exports = {
  createRecord,
  createSchema,
  deleteRecord,
  updateRecord,
  readCSVFile,
  readRecord,
};
