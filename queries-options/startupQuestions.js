const inquirer = require('inquirer');
const connection = require('../config/connection');
const {
  viewAllOf,
  addNewDepartment,
  addNewRole,
  addNewEmployee,
  updateRole,
  viewEmployeeByManager,
  updateManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewBudget,
} = require('../queries/index.js');
const startQuestion = [
  {
    type: 'list',
    name: 'action',
    message: 'what would you like to do?',
    loop: false,
    choices: [
      'View all employees',
      'View all roles',
      'View all departments',
      'add an employee',
      'add a role',
      'add a department',
      'update role for an employee',
      "update employee's manager",
      'view employees by manager',
      'delete a department',
      'delete a role',
      'delete an employee',
      'View the total utilized budget of a department',
      'quit',
    ],
  },
];

// start prompter
function startPrompt() {
  // inquirer prompter
  inquirer
    .prompt(startQuestion)
    .then((response) => {
      switch (response.action) {
        case 'View all employees':
          viewAllOf('EMPLOYEE', startPrompt);
          break;
        case 'View all roles':
          viewAllOf('ROLE', startPrompt);
          break;
        case 'View all departments':
          viewAllOf('DEPARTMENT', startPrompt);
          break;
        case 'add a department':
          addNewDepartment(startPrompt);
          break;
        case 'add a role':
          addNewRole(startPrompt);
          break;
        case 'add an employee':
          addNewEmployee(startPrompt);
          break;
        case 'update role for an employee':
          updateRole(startPrompt);
          break;
        case 'view employees by manager':
          viewEmployeeByManager(startPrompt);
          break;
        case "update employee's manager":
          updateManager(startPrompt);
          break;
        case 'delete a department':
          deleteDepartment(startPrompt);
          break;
        case 'delete a role':
          deleteRole(startPrompt);
          break;
        case 'delete an employee':
          deleteEmployee(startPrompt);
          break;
        case 'View the total utilized budget of a department':
          viewBudget(startPrompt);
          break;
        default:
          connection.end();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = startPrompt;
