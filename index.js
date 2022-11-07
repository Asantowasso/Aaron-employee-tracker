//First, give the following options view all departments, all roles, all employees, add a department, add a role and update an employee role(x)
// view all departments is chosen and I see a table with department names and ids(x)
// view all roles is chosen and I see and I see a table with a job title, role id, department the role belongs to as well as the salary(x)
// view all employees is chosen I see employee ids, first names, last names, job titles, departments, salaries and manager ids
// Add a department is chosen and I enter the department's name and it is added to the department table(x)
//


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

            case "view all employees":
              viewEmployees();
              break;

            case "Add a department":
              addDepartment();
              break;
          }
        })
};

function viewDepartments(){
  var query = "SELECT id, d_name FROM department";

  connection.query(query,function (error, results) {
    console.table(results)
    userOptions()
    
  });

}

function viewRoles(){
  var query = "SELECT role.id, j_title, salary, d_name FROM role JOIN department ON role.d_id = department.id"

  connection.query(query,function (err, results){
    console.table(results)
    userOptions()
  })

}

function viewEmployees(){
  //I need 1. employee ids(id)(x), 2.first name(employee)(x), 3. last name(employee)(x) 4. j_title (role), 5. d_name(department), salary(role), 6. manager_id(employee)(x)
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.j_title employee.manager_id FROM employee JOIN role"

  connection.query(query, function (err, results){
    console.table(results)
  })
}

function addDepartment(){
  inquirer.prompt({
    type: "input",
    name: "addDepartment",
    message: "What is the department called?"
  }).then(function (answer, results){
    connection.query("INSERT INTO department SET ?",{d_name: answer.addDepartment},
    
    console.table(results)
      
    )
    userOptions()
  })
}
