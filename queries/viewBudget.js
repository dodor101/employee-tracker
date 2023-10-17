const inquirer = require('inquirer');
const connection = require('../config/connection');

// view budget
const viewBudget = (startPrompt) => {
  connection.query('SELECT * FROM DEPARTMENT', (err, res) => {
    if (err) throw err;

    const depChoice = [];
    res.forEach(({ name, id }) => {
      depChoice.push({
        name: name,
        value: id,
      });
    });

    let questions = [
      {
        type: 'list',
        name: 'id',
        choices: depChoice,
        message: "which department's budget do you want to see?",
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `SELECT D.name, SUM(salary) AS budget FROM
      EMPLOYEE AS E LEFT JOIN ROLE AS R
      ON E.role_id = R.id
      LEFT JOIN DEPARTMENT AS D
      ON R.department_id = D.id
      WHERE D.id = ?
      `;
        connection.query(query, [response.id], (err, res) => {
          if (err) throw err;
          console.table(res);
          // display users options again
          startPrompt();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = viewBudget