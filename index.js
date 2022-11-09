//First, give the following options view all departments, all roles, all employees, add a department, add a role and update an employee role(x)
// view all departments is chosen and I see a table with department names and ids(x)
// view all roles is chosen and I see and I see a table with a job title, role id, department the role belongs to as well as the salary(x)
// view all employees is chosen I see employee ids, first names, last names, job titles, departments, salaries and manager ids(x)
// Add a department is chosen and I enter the department's name and it is added to the department table(x)
// Add a role is chosen and I enter the name, salary and department(x)
// Add a employee is chosen and I enter first name, last name, role and manager
// Update an employee role is chosen and I select an employee and update their role info in the table

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
        "add an employee",
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

            case "add a role":
              addRole();
              break;

            case "add an employee":
              addEmployee();
              break;

            case "Update an employee role":
              updateRole();
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
  //I need 1. employee ids(id)(x), 2.first name(employee)(x), 3. last name(employee)(x) 4. j_title (role)(x), 5. d_name(department)(x), salary(role)(x), 6. manager_id(employee)(x)
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.j_title, employee.manager_id, department.d_name FROM employee JOIN role ON role_id = role.id JOIN department ON d_id = department.id"

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

function addRole(){
  inquirer.prompt([
    {
      type: "input",
      name: "addTitle",
      message:"What is the role called?"

    },

    {
      type:"input",
      name: "addSalary",
      message: "What is this role's salary"
    },

    {
      type: "input",
      name: "addDid",
      Message: "what is the ID for this department"
    }
    
  ]).then(function(answer, results){
    connection.query("INSERT INTO role SET ?", {j_title: answer.addTitle, d_id: answer.addDid, salary: answer.addSalary},

    console.table(results)

    )
    userOptions()
  })

}

function addEmployee(){
  inquirer.prompt([
    {
      type: "input",
      name: "addFname",
      Message: "What is the employee's first name?"
    },

    {
      type: "input",
      name: "addLname",
      Message: "What is the employee's last name?"
    },

    {
      type: "input",
      name: "addroleid",
      message: "What is the id of the employee's role? (answer must be a number)"
    },

    {
      type: "input",
      name: "addmanagerid",
      message:"What is the id of the employee's manager? (answer must be a number)"
    }

  ]).then(function (answer, results){
    connection.query("INSERT INTO employee SET ?",{first_name: answer.addFname, last_name: answer.addLname, role_id: answer.addroleid, manager_id: answer.addmanagerid},
    
    console.table(results)
      
    )
    userOptions()
  })
}

function updateRole(){
  inquirer.prompt([
    {
      type: "input",
      name: "whoUpdate",
      message:"What is the first name of the employee that is being updated?"
    },

    {
      type: "input",
      name: "updatedRole",
      message: "What is the new Role ID for this employee?"
    }
  ]).then(function(answer, results){

  
    connection.query("UPDATE employee SET ? WHERE ?",
      {first_name: answer.whoUpdate,role_id: answer.updatedRole},
        console.table(results)

    )
    userOptions()
})
}

