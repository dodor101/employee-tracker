const figlet = require('figlet');
const colors = require('colors');
const connection = require('./config/connection');
const startPrompt = require('./prompter/startPrompt');
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  figlet('Employee tracker', function (err, data) {
    if (err) {
      console.log('ascii art not loaded');
    } else {
      console.log(colors.dim(data));
    }
    // startPrompt on npm start
    startPrompt();
  });
});
