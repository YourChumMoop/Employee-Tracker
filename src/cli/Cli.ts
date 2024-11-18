import inquirer from "inquirer";
import { viewTable, updateEmployeeRole, currentEmployees, currentRoles, newEmp, newDept, newRoll} from './sqlQueries.js';


class Cli {
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
                    'Add A Roll',
                    'Exit',
                ],
            },
        ])
        .then((res) => {
            // Switch case statement for selecting from main menu
            switch (res.action) {
                case 'View All Employees':
                    viewTable('employee');
                    this.mainMenu;
                    break;
                case 'Add Employee':
                    this.newEmployeeCli();
                    break;
                case 'Update Employee Role':
                    this.updateEmployeeRoleCli();
                    break;
                case 'View All Departments':
                    viewTable('department');
                    this.mainMenu;
                    break;
                case 'Add Departments':
                    this.addDepartmentCli();
                    break;
                case 'View All Roles':
                    viewTable('role');
                    this.mainMenu
                    break;
                case 'Add A Roll':
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
        .then((res) => {
            newEmp(res.firstName,res.lastName,res.roleID,res.managerID);
            this.mainMenu();
        })
    };

    async updateEmployeeRoleCli(): Promise<void> {
        const curRoles = await currentRoles();
        const curEmp = await currentEmployees();

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
        .then((res) => {
            updateEmployeeRole(res.employee,res.newRole);
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
        .then((res) => {
            newDept(res.newDept);
            this.mainMenu;
        });
    };

    async addRoleCli(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRoll',
                message: 'Name of New Roll: '
            }
        ])
        .then((res) => {
            newRoll(res.newRoll);
            this.mainMenu;
        })
    }
};

export default Cli;