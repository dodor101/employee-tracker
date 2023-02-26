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
    choices: [ 'view all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Empployee Manager', 'Delete Department', 'Delete a Role', 'Delete Employee' ],
  }).then(answer => {
    switch (answer.menu) {
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

// create view all departments function
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.table(result);
    startPrompt();
  });

};

// create view all roles function
function viewAllRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    startPrompt();
  });
};


// create view all employees function
function viewAllEmployees() {
  const sql = `SELECT employee.id,
              employee.first_name,
              employee.last_name,
              role.title,
              department.department_name,
              role.salary,
              CONCAT(manager.first_name, ' 'manager.lastname ) AS Manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT department ON role.department_id = department.id
              LEFT JOIN employee AS manager on  employee.manager_id = manager.id
              ORDER BY employee.id`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.table(result);
    startPrompt()

  });

};

// create function for adding a department
function addDepartment() {
  inquirer.prompt([ {
    name: 'department_name',
    type: 'input',
    message: 'Add the name of new department.'

  } ]).then(answer =>{
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`
    const params = [answer.deparment_name];
    db.query(sql, params, (err, result) =>{
      if(err){
        console.log(err)
      }
      console.table(result);
      startPrompt()
    });
  });
};

// create function for adding a role
function addRole() {

};

// create function for adding an employee
function addEmployee() {

};

// create function for updating an employee role
function updateEmployeeRole() {

};

// create function updating and employee manager
function updateEmployeeManager() {

};

// create function for deleting a department
function deleteDepartment() {

};

// create function for deleting a role
function deleteRole() {

};

// create function for deleting a employee
function deleteEmployee() {

};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


