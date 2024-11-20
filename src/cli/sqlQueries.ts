//import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';
await connectToDb();
//TODO functions for building quieries for SQL database

// VIEW FUNCTIONS
// Returns a table containing all information from specified table
export async function viewEmployeeTable() {
    //make a postgres query to select the table
    const results = await pool.query(`SELECT * FROM employee`);
    console.table(results.rows);
}
export async function viewRoleTable() {
    //make a postgres query to select the table
    const results = await pool.query(`SELECT * FROM role`);
    console.table(results.rows);
}
export async function viewDepartmentTable() {
    //make a postgres query to select the table
    const results = await pool.query(`SELECT * FROM department`);
    console.table(results.rows);
}
//Employee Functions

    //Function for creating a new Employee
export const newEmp = async (first_name:string,last_name:string,role_id:string,manager_id:string) => {
    const result = await pool.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) ` + 
                `VALUES ($1,$2,$3,$4);`,
                [first_name,last_name,role_id,manager_id]);
            if(result){
                console.log(`Employee ${first_name} ${last_name} Added!`);
            };
};
//Updates a current Employee's Role
export async function updateEmployeeRole(empId:number,roleId:number) {
    const result = await pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`,[roleId,empId]);
    if(result){
        console.log(`Employee Role Updated`);
    }
};

//Fuctions for finding what's currently in the database for other funuctions

    //returns an array of objects that contain every employee's full name and id.
export async function currentEmployees() {
    const curEmp:Array<{name:string,value:number|null}> = [];
    const result = await pool.query(`SELECT id, CONCAT (first_name,' ',last_name) AS fullname FROM employee`);
    for(let i = 0; i < result.rows.length; i++){
        curEmp.push(
            {
                name: result.rows[i].fullname,
                value: result.rows[i].id
            }
        )
    }
    curEmp.push(
        {
            name: 'None',
            value: null
        }
    );
    return curEmp;
};

    //returns an array of objects that contain every role's title and id
export async function currentRoles() {
    const curRoles:Array<{name:string,value:number|null}> = [];
    const result = await pool.query('SELECT title,id FROM role');
    for(let i = 0; i < result.rows.length; i++){                   
        curRoles.push(
            {
                name: result.rows[i].title,
                value: result.rows[i].id
            }
        );
        
    }
    return curRoles;
};

export async function currentDepartments() {
    const curDept:Array<{name:string,value:number|null}> = [];
    const result = await pool.query('SELECT title,id FROM department');
    for(let i = 0; i < result.rows.length; i++){                   
        curDept.push(
            {
                name: result.rows[i].title,
                value: result.rows[i].id
            });           
    }
    return curDept;
};

//Creates a new department
export async function newDept(deptName:string) {
    const results = await pool.query(`INSERT INTO department (name) VALUES ($1)`, [deptName]);
    if(results){console.log(`${deptName} Department Added!`);}
};

//Creates a New role
export async function newrole(roleName:string) {
    const results = await pool.query(`INSERT INTO role (name) VALUES ($1)`, [roleName]);
    if(results){console.log(`${roleName} role Added!`);}
};
