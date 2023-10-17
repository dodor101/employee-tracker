const inquirer = require('inquirer');
const connection = require('../config/connection');

// view an employee manager
const viewEmployeeByManager = (startPrompt) => {
  //get all the employee list
  connection.query('SELECT * FROM EMPLOYEE', (err, employeeRes) => {
    if (err) throw err;
    const employeeChoice = [
      {
        name: 'None',
        value: 0,
      },
    ];
    employeeRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + ' ' + last_name,
        value: id,
      });
    });

    let questions = [
      {
        type: 'list',
        name: 'manager_id',
        choices: employeeChoice,
        message: 'whose role do you want to update?',
      },
    ];

    inquirer
      .prompt(questions)
      .then((response) => {
        let manager_id, query;
        if (response.manager_id) {
          query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name,
          R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
          FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
          LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
          LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id
          WHERE E.manager_id = ?;`;
        } else {
          manager_id = null;
          query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name,
          R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
          FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
          LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
          LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id
          WHERE E.manager_id is null;`;
        }
        connection.query(query, [response.manager_id], (err, res) => {
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
module.exports = viewEmployeeByManager;
