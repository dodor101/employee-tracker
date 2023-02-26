const mysql = require('mysql2');
// Connect to database

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Ilovemyself',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

module.exports = db;