//First, give the following options view all departments, all roles, all employees, add a department, add a role and update an employee role(x)
// view all departments is chosen and I see a table with department names and ids
// view all roles is chosen and I see and I see a table with a job title, role id, department the role belongs to as well as the salary

const mysql = require('mysql2')
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'rootroot',
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
          
            case "view all roles":
              viewRoles();
              break;
          }
        })
};
// userOptions();

function viewDepartments(){
  var query = "SELECT id, d_name FROM department";

  connection.query(query,function (error, results) {
    console.table(results)
    userOptions()
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });

}

function viewRoles(){
  var query = "SELECT role.id, j_title, salary, d_name FROM role JOIN department ON role.d_id = department.id"

  connection.query(query,function (err, results){
    console.table(results)
    userOptions()
  })

}

// function init() {
//     inquirer.prompt(userOptions)
//     .then ((inquirerResponse) => {
//     console.log(inquirerResponse)

// })
// }
// // Function call to initialize app
// init()
