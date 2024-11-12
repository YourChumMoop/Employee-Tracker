import inquirer from "inquirer";


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
                    //TODO add viewEmployees()
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
};