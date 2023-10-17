const inquirer = require('inquirer');
// add a new department
const addNewDepartment = (startPrompt) => {
  let questions = [
    {
      type: 'input',
      name: 'name',
      message: 'what is the new department name?',
    },
  ];

  inquirer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      connection.query(query, [response.name], (err, res) => {
        if (err) throw err;
        console.log(`Successfully inserted ${response.name} department at id ${res.insertId}`);
        // display users options again
        startPrompt();
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = addNewDepartment;
