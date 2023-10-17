const inquirer = require('inquirer');
const connection = require('../config/connection');

// delete a department
const deleteDepartment = () => {
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

    let questions = [
      {
        type: 'list',
        name: 'id',
        choices: departments,
        message: 'which department do u want to delete?',
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `DELETE FROM DEPARTMENT WHERE id = ?`;
        connection.query(query, [response.id], (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} row(s) successfully deleted!`);
          startPrompt();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
module.exports = deleteDepartment;
