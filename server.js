const figlet = require('figlet');
const connection = require('./config/connection');
const startPrompt = require('./queries-options/startupQuestions');
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  figlet('Employee tracker', function (err, data) {
    if (err) {
      console.log('ascii art not loaded');
    } else {
      console.log(data);
    }
    // startPrompt on npm start
    startPrompt();
  });
});
