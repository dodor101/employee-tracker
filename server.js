const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const PORT = 3001

const app = express();

// Add express midlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Ilovemyself',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

// A Response for (404)
app.use((req, res) => {
  res.status(404).end();
});

// create prompt function to start the program.

function startPrompt() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to accomplish?',
    choices: [ 'view all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Empployee Manager', 'Delete Department', 'Delete a Role', 'Delete Employee'],
  }).then(answer => {
    switch(answer.menu){
      case 'View all Departments':
        viewAllDepartments();
        break;
      case 'View all Roles':
        viewAllRoles();
        break;
      case 'View all Employees':
        viewAllEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Update an Employee Manager':
        updateEmployeeManager();
        break;
      case 'Delete Department':
        deleteDepartment();
        break;
      case 'Delete Role':
        deleteRole();
        break;
      case 'Delete Employee':
        deleteEmployee();
        break;
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
