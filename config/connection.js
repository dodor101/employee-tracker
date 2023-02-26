const mysql = require('mysql2');
// Connect to database

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Ilovemyself',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

module.exports = db;