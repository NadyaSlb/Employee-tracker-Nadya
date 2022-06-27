import inquirer from 'inquirer';
import mysql from 'mysql2'
//const mysql = require('mysql2');
import cTable from 'console.table';

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'NL230710??=>k',
    database: 'employees'
  },
  console.log('Connected to the employees database.')
);

const startMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'userchoice',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ]).then(choice => {
    if (choice.userchoice == 'view all departments') {
      db.query(`SELECT * FROM department`, (err, rows) => {
        console.table(rows);
        console.log(`<-------------------------------->`)
        startMenu()
      });
    }
    if (choice.userchoice == 'view all roles') {
      db.query(`SELECT employee_role.id AS id, employee_role.title AS title, department.department_name AS department, employee_role.salary AS salary FROM employee_role JOIN department ON employee_role.department_id = department.id`
        , (err, rows) => {
          console.table(rows);
          console.log(`<-------------------------------->`)
          startMenu()

        });
    }
    if (choice.userchoice == 'view all employees') {
      queryEmployee()
    }
    if (choice.userchoice == 'add a department') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'department',
          message: 'What is the name of the department?',
        },
      ])
      .then ((answer) => {
        db.query(`INSERT INTO department (department_name) VALUES ('${answer.department}')`
        , (err, rows) => {
          console.log(`Added ${answer.department} to the database`)
          startMenu()
        });
      })
       
    }
    if (choice.userchoice == 'add a role') {
      var departmentsChoice = [];
      db.query('SELECT * FROM department', (err, rows) => {
        for (var i=0; i<rows.length; i++){
          var departments = rows[i].department_name;
          departmentsChoice.push(departments);
        }
      })
      inquirer.prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'userchoice',
          message: 'Which department does the role belong to?',
          choices: departmentsChoice
        }
      ])
      .then ((answer) => {
        var roleNameChoice = answer.roleName;
        var roleSalaryChoice = answer.roleSalary;
        var depId;
        db.query (`SELECT id FROM department WHERE department_name = '${answer.userchoice}'`
        , (err, drows) => {       
          for (var i=0; i<drows.length; i++){
            //console.log(drows[i].id)
            depId = drows[i].id
          }
        }
        )
        db.query (
         // `INSERT INTO employee_role (title, salary, department_id) VALUES ('${roleNameChoice}', '${roleSalaryChoice}', '${depId})`
         `INSERT INTO employee_role SET ?`,
         {title: roleNameChoice,
        salary: roleSalaryChoice,
      department_id: depId}
          , (err, rows) => {
            console.log(`New role was added`)
            startMenu()
  
          });
     //`INSERT INTO employee_role (title, salary, department_id) VALUES ('${answer.roleName}, '${answer.roleSalary}', depId)`
        });

    }
    if (choice.userchoice == 'add an employee') {
      // let variable = async query for the departments with the id
      // prompt the user,"Select the number for the right department"
      // Choices: [variable]
      // if choice = something, department value = 1
    }
    if (choice.userchoice == 'update an employee role') {

    }
  })
}

startMenu()

function queryEmployee() {
  db.query(`SELECT employee.id AS id, employee.first_name AS name, employee.last_name AS last_name, employee_role.title AS title, department.department_name AS department, employee_role.salary AS salary FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id`
    , (err, rows) => {
      err
        ? console.log(err)
        : console.table(rows);
      console.log(`<-------------------------------->`)
      startMenu()

    });
}
