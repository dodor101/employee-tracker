const inquirer = require('inquirer');
const connection = require('../config/connection');

// update a manager
const updateManager = (startPrompt) => {
  //get all the employee list
  connection.query('SELECT * FROM EMPLOYEE', (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = [];
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + ' ' + last_name,
        value: id,
      });
    });

    const managerChoice = [
      {
        name: 'None',
        value: 0,
      },
    ]; //an employee could have no manager
    emplRes.forEach(({ first_name, last_name, id }) => {
      managerChoice.push({
        name: first_name + ' ' + last_name,
        value: id,
      });
    });

    let questions = [
      {
        type: 'list',
        name: 'id',
        choices: employeeChoice,
        message: 'who do you want to update?',
      },
      {
        type: 'list',
        name: 'manager_id',
        choices: managerChoice,
        message: "whos is the employee's new manager?",
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `UPDATE EMPLOYEE SET ? WHERE id = ?;`;
        let manager_id = response.manager_id !== 0 ? response.manager_id : null;
        connection.query(query, [{ manager_id: manager_id }, response.id], (err, res) => {
          if (err) throw err;

          console.log("successfully updated employee's manager");
          startPrompt();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = updateManager;
