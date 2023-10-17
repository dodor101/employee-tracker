const inquirer = require('inquirer');
const connection = require('../config/connection');
// add a role
const addNewRole = (startPrompt) => {
  //get the list of all department with department_id to make the choices object list for prompt question
  const departments = [];
  connection.query('SELECT * FROM DEPARTMENT', (err, res) => {
    if (err) throw err;

    res.forEach((dep) => {
      let qObj = {
        name: dep.name,
        value: dep.id,
      };
      departments.push(qObj);
    });

    //question list to get arguments for making new roles
    let questions = [
      {
        type: 'input',
        name: 'title',
        message: 'what is the title of the new role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'what is the salary of the new role?',
      },
      {
        type: 'list',
        name: 'department',
        choices: departments,
        message: 'which department is this role in?',
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
        connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
          if (err) throw err;
          console.log(`Successfully inserted ${response.title} role at id ${res.insertId}`);
          startPrompt();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = addNewRole;
