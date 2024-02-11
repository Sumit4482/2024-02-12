# 🗃️ Man Made Database 📁📄

Welcome to Man Made Database, a command-line tool designed to simplify directory and file management tasks, along with basic record management functionalities. This project aims to provide users with an intuitive interface for organizing their file system as if it were a database, allowing for easy creation, deletion, and modification of directories, files, and records.

## ✨ Features

- **Directory Operations**: Create, update, and delete directories. List directory contents.
- **File Operations**: Create, delete, and rename files. Read file contents.
- **Record Operations**: Define schemas and manage records within files.

## 📝 Overview

The Man-Made Database tool is built on Node.js, utilizing the readline and fs modules to interact with the user and perform file system operations. The project is organized into several modules, each responsible for specific functionalities:

- **main.js**: The main entry point of the application. It handles user input and delegates tasks to various modules based on the user's selections.
- **fileOperations.js**: Contains functions for file-related operations such as creating, deleting, and renaming files, as well as reading file contents.
- **directoryOperations.js**: Provides functions for managing directories, including creating, updating, and deleting directories, as well as listing directory contents.
- **recordOperations.js**: Implements functionalities related to managing records within files. It includes functions for defining schemas and adding, updating, and deleting records.

## 🚀 Getting Started

To use Man-Made Database, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/man-made-database.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   node main.js
   ```

## 🛠️ Usage

Once the application is running, you'll be presented with a menu showing the available options. Simply enter the corresponding number to perform the desired operation. The tool provides a user-friendly interface for managing directories, files, and records, making it easy to organize your file system effectively.

## ➕ Adding New Functionality

To extend the capabilities of Man Made Database with new functionalities:

1. Create a new JavaScript file for your module (e.g., `myModule.js`) in the project's root directory.
2. Define your functions and export them:

   ```javascript
   // myModule.js

   function myFunction() {
       // Implementation
   }

   module.exports = {
       myFunction
   };
   ```

3. Import and use your module in `main.js` or other relevant files:

   ```javascript
   const { myFunction } = require('./myModule');

   // Use myFunction in your code
   ```

4. Update the menu in `main.js` to include an option for your new functionality.


## 📧 Contact

If you have any questions or suggestions, feel free to contact us at [sbanwakde4482@gmail.com](mailto:sbanwakde4482@gmail.com).
