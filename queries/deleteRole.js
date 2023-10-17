const inquirer = require('inquirer');
const connection = require('../config/connection');
// delete a role

const deleteRole = (startPrompt) => {
  connection.query('SELECT * FROM ROLE', (err, res) => {
    if (err) throw err;

    const roleChoice = [];
    res.forEach(({ title, id }) => {
      roleChoice.push({
        name: title,
        value: id,
      });
    });

    let questions = [
      {
        type: 'list',
        name: 'id',
        choices: roleChoice,
        message: 'which role do u want to delete?',
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        const query = `DELETE FROM ROLE WHERE id = ?`;
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
module.exports = deleteRole;
