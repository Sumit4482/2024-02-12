const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createSchema(directoryPath, fileName, schema) {
    const filePath = path.join(directoryPath, fileName + '.csv');
    const schemaColumns = schema.split(',').map(col => col.trim());
  
    let header = '';
  
    for (let i = 0; i < schemaColumns.length; i++) {
      header += schemaColumns[i];
      if (i !== schemaColumns.length - 1) {
        header += ',';
      }
    }
    header += '\n';
  
    fs.appendFile(filePath, header, 'utf8', (err) => {
      if (err) {
        console.error('Error writing schema to file:', err);
      } else {
        console.log('Schema written to file successfully.');
      }
  
    });
  }

function createRecord(directoryPath, fileName, recordValues) {
    const filePath = path.join(directoryPath, fileName + '.csv');
    const values = recordValues.split(',').map(value => value.trim());
  
    // Construct record line in CSV format
    const recordLine = values.join(',') + '\n';
  
    // Append record to file
    fs.appendFile(filePath, recordLine, 'utf8', (err) => {
      if (err) {
        console.error('Error writing record to file:', err);
      } else {
        console.log('Record written to file successfully.');
      }
      // ProcessUserInput not called here
    });
  }


  function deleteRecord(directoryPath, fileName) {
    const filePath = path.join(directoryPath, fileName + '.csv');
  
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error('Error: File does not exist.');
      return;
    }
  
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting record:', err);
      } else {
        console.log('Record deleted successfully.');
      }
      // ProcessUserInput not called here
    });
  }
  
  function updateRecord(directoryPath, fileName, recordId, updatedValues) {
    const filePath = path.join(directoryPath, fileName + '.csv');
  
    // Read the content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
  
      // Split the content into lines
      const lines = data.split('\n');
  
      // Find the record with the specified recordId
      let found = false;
      for (let i = 0; i < lines.length; i++) {
        const columns = lines[i].split(',');
        if (columns[0] === recordId) {
          // Update the record with updatedValues
          lines[i] = updatedValues.join(',') + '\n';
          found = true;
          break;
        }
      }
  
      // If the record is not found
      if (!found) {
        console.error('Error: Record with specified ID not found.');
        return;
      }
  
      // Write the updated content back to the file
      fs.writeFile(filePath, lines.join('\n'), 'utf8', (err) => {
        if (err) {
          console.error('Error updating record:', err);
        } else {
          console.log('Record updated successfully.');
        }
        // ProcessUserInput not called here
      });
    });
  }
  

module.exports = {
  createRecord,
  createSchema,
  deleteRecord,
  updateRecord
};
