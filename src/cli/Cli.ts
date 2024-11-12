import inquirer from "inquirer";
import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';
import { buildViewQ, newEmpQ } from './sqlQueries.js';
await connectToDb();

//TODO create a mainMenu() where the program asks it's first question and goes back to
    //it will have the options for VIEW ALL departments, VIEW ALL roles, VIEW ALL employees, 
    //ADD a department, ADD a roll, ADD an employer, UPDATE employee role
class Cli {
    mainMenu(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Departments',
                    'Add Departments',
                    'View All Roles',
                    'Add A Roll',
                    'Exit',
                ],
            },
        ])
        .then((res) => {
            // Switch case statement for selecting from main menu
            switch (res.action) {
                case 'View All Employees':
                    this.viewEmployees();
                    break;
                case 'Add Employee':
                    //TODO add newEmployee()
                    break;
                case 'Update Employee Role':
                    //TODO add updateEmployee()
                    break;
                case 'View All Departments':
                    //TODO add viewDepartments()
                    break;
                case 'Add Departments':
                    //TODO add addDepartment()
                    break;
                case 'View All Roles':
                    //TODO viewRoles()
                    break;
                case 'Add A Roll':
                    //TODO addRoll()
                    break;
                default:
                    process.exit(0);
            }
        })
    };
    //
    viewEmployees(): void {
        //make a postgres query to select the employee table, then view it 
        pool.quary(buildViewQ('employee') , (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.table(result.rows);
            }
            this.mainMenu();
        })
    };

    // Inquire a series of questions to build and add a new employee to the database
    newEmployee(): void {
        const currentRoles = pool.quary('SELECT title FROM role', (err:Error, result: QueryResult) => {
            if (err) { 
                console.log(err);
            } else if (result) {
                return result;
            }
        });
        const currentEmployees = pool.quary(`SELECT CONCAT (first_name,' ',last_name) AS fullname FROM employee`, (err:Error, result: QueryResult) => {
            if (err) { 
                console.log(err);
            } else if (result) {
                return result;
            }
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Employee First Name: '
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Employee Last Name: '
            },
            {
                type: 'list',
                name: 'roleID',
                message: 'Employee Role: ',
                choices: [currentRoles] //check SQL for role table select title 
            },
            {
                type: 'list',
                name: 'managerID',
                message: 'Manager: ',
                choices: [currentEmployees,'None'] //check SQL quary for all employee names
            }
        ]).then((res) => {
            pool.quary(newEmpQ(res.firstName,res.lastName,res.roleID,res.managerID), (err:Error, result:QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(`Employee ${res.firstName} ${res.lastName} Added!`);
                }
            })
            
        })
    };
};