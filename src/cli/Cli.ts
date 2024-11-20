import inquirer from "inquirer";
import { viewEmployeeTable, viewRoleTable, viewDepartmentTable, 
    updateEmployeeRole, currentEmployees, currentRoles, currentDepartments,
    newEmp, newDept, newrole} from './sqlQueries.js';
import logo from 'asciiart-logo';

class Cli {
    title(){
        console.log(logo({
            name: 'Employee Tracker',
            font: 'Speed',
            padding: 3,
            margin: 3,
            borderColor: 'green',
            logoColor: 'cyan',
        })
        .render())
    };

    async mainMenu(): Promise<void> {
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
                    'Add A role',
                    'Exit',
                ],
            },
        ])
        .then(async (res) => {
            // Switch case statement for selecting from main menu
            switch (res.action) {
                case 'View All Employees':
                    await viewEmployeeTable();
                    this.mainMenu();
                    break;
                case 'Add Employee':
                    this.newEmployeeCli();
                    break;
                case 'Update Employee Role':
                    this.updateEmployeeRoleCli();
                    break;
                case 'View All Departments':
                    await viewDepartmentTable();
                    this.mainMenu();
                    break;
                case 'Add Departments':
                    this.addDepartmentCli();
                    break;
                case 'View All Roles':
                    await viewRoleTable();
                    this.mainMenu();
                    break;
                case 'Add A role':
                    this.addRoleCli();
                    break;
                default:
                    process.exit(0);
            }
        })
    };
    //


    // Inquire a series of questions to build and add a new employee to the database
    async newEmployeeCli(): Promise<void> {
        const curRoles = await currentRoles();
        const curEmp = await currentEmployees();
 
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
                choices: curRoles 
            },
            {
                type: 'list',
                name: 'managerID',
                message: 'Current Manager: ',
                choices: curEmp
            }
        ])
        .then(async(res) => {
            await newEmp(res.firstName,res.lastName,res.roleID,res.managerID);
            this.mainMenu();
        })
    };

    async updateEmployeeRoleCli(): Promise<void> {
        const curRoles = await currentRoles();
        const curEmp = await currentEmployees();
        console.table(curEmp);
        console.table(curRoles);
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select Employee to Update: ',
                choices: curEmp
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Select New Role: ',
                choices: curRoles
            }
        ])
        .then(async(res) => {
            await updateEmployeeRole(res.employee,res.newRole);
            this.mainMenu();
        })
    };

    async addDepartmentCli(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'newDept',
                message: 'Name of New Department: ',
            }
        ])
        .then(async(res) => {
            await newDept(res.newDept);
            this.mainMenu();
        });
    };

    async addRoleCli(){
        const curDept = await currentDepartments();
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Name of New role: '
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary of role: '
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Department of role: ',
                choices: curDept
            }
        ])
        .then(async(res) => {
            await newrole(res.title,res.salary,res.dept);
            this.mainMenu();
        })
    }
};

export default Cli;