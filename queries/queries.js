const connection = require('../config/connection');
// view selected table
const viewAllOf = (table, startPrompt) => {
  // const query = `SELECT * FROM ${table}`;
  let query;
  if (table === 'DEPARTMENT') {
    query = `SELECT * FROM DEPARTMENT`;
  } else if (table === 'ROLE') {
    query = `SELECT R.id AS id, title, salary, D.name AS department
    FROM ROLE AS R LEFT JOIN DEPARTMENT AS D
    ON R.department_id = D.id;`;
  } else {
    //employee
    query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name,
    R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
    FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
    LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
    LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id;`;
  }
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    startPrompt();
  });
};

module.exports = viewAllOf;
