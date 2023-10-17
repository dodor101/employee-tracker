const inquirer = require('inquirer');
const connection = require('../config/connection');

// update a role
const updateRole = (startPrompt) => {
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
          type: 'list',
          name: 'id',
          choices: employeeChoice,
          message: 'whose role do you want to update?',
        },
        {
          type: 'list',
          name: 'role_id',
          choices: roleChoice,
          message: "what is the employee's new role?",
        },
      ];

      inquirer
        .prompt(questions)
        .then((response) => {
          const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
          connection.query(query, [{ role_id: response.role_id }, 'id', response.id], (err, res) => {
            if (err) throw err;

            console.log("successfully updated employee's role!");
            startPrompt();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};

module.exports = updateRole;
