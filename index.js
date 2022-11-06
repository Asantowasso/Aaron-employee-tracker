//First, give the following options view all departments, all roles, all employees, add a department, add a role and update an employee role(x)
// view all departments is choses and I see a table with department names and ids
const mysql = require('mysql12')
const inquirer = require("inquirer");
const userOptions = () => {
  inquirer.prompt([
    {
      name: "A list of options",
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
    },
  ]);
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
