const inquirer = require('inquirer');
const connection = require('../config/connection');

// add an employee
const addNewEmployee = (startPrompt) => {
  //get all the employee list to make choice of employee's manager
  connection.query('SELECT * FROM EMPLOYEE', (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = [
      {
        name: 'None',
        value: 0,
      },
    ]; //an employee could have no manager
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + ' ' + last_name,
        value: id,
      });
    });

    //get all the role list to make choice of employee's role
    connection.query('SELECT * FROM ROLE', (err, rolRes) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id,
        });
      });

      let questions = [
        {
          type: 'input',
          name: 'first_name',
          message: "what is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "what is the employee's last name?",
        },
        {
          type: 'list',
          name: 'role_id',
          choices: roleChoice,
          message: "what is the employee's role?",
        },
        {
          type: 'list',
          name: 'manager_id',
          choices: employeeChoice,
          message: "who is the employee's manager? (could be null)",
        },
      ];

      inquirer
        .prompt(questions)
        .then((response) => {
          const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
          let manager_id = response.manager_id !== 0 ? response.manager_id : null;
          connection.query(
            query,
            [[response.first_name, response.last_name, response.role_id, manager_id]],
            (err, res) => {
              if (err) throw err;
              console.log(
                `successfully inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`
              );
              startPrompt();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};
module.exports = addNewEmployee;
