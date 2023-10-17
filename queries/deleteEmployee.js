const inquirer = require('inquirer');
const connection = require('../config/connection');

// delete an employee
const deleteEmployee = (startPrompt) => {
  connection.query('SELECT * FROM EMPLOYEE', (err, res) => {
    if (err) throw err;

    const employeeChoice = [];
    res.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + ' ' + last_name,
        value: id,
      });
    });

    let questions = [
      {
        type: 'list',
        name: 'id',
        choices: employeeChoice,
        message: 'which employee do u want to delete?',
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `DELETE FROM EMPLOYEE WHERE id = ?`;
        connection.query(query, [response.id], (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} row(s) successfully deleted!`);
          
          // display users options again
          startPrompt();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = deleteEmployee;
