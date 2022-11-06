//First, give the following options view all departments, all roles, all employees, add a department, add a role and update an employee role(x)
// view all departments is chosen and I see a table with department names and ids

const mysql = require('mysql2')
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'password',
  database: 'org_db'
});

connection.connect(function (err){
  if (err) throw err;
  userOptions()
});

const userOptions = () => {
  inquirer.prompt({
    
      name: "options",
      type: "list",
      message: "select an option",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "Add a department",
        "add a role",
        "Update an employee role",
      ],
    
        })
        .then(function (answer){
          switch (answer.options){
            case "view all departments":
              viewDepartments();
              break;
          }
        })
};
userOptions();

// function init() {
//     inquirer.prompt(userOptions)
//     .then ((inquirerResponse) => {
//     console.log(inquirerResponse)

// })
// }
// // Function call to initialize app
// init()
