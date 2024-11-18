import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';
await connectToDb();
//TODO functions for building quieries for SQL database

// VIEW FUNCTION
// Returns a table containing all information from specified table
export async function viewTable(table:string) {
    //make a postgres query to select the table
    pool.query(`SELECT * FROM $1`, [table], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else if (result) {
            console.table(result.rows);
        }
    });
}

//Employee Functions

    //Function for creating a new Employee
export const newEmp = (first_name:string,last_name:string,role_id:string,manager_id:string) => {
    pool.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) ` + 
                `VALUES ($1,$2,$3,$4;)`,
                [first_name,last_name,role_id,manager_id], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log(`Employee ${first_name} ${last_name} Added!`);
                    }                  
                }
            );
};
//Updates a current Employee's Role
export async function updateEmployeeRole(empId:number,roleId:number) {
    pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`,[roleId,empId], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else if(result) {
            console.log("Role Updated!");
        }
    });
};

//Fuctions for finding what's currently in the database for other funuctions

    //returns an array of objects that contain every employee's full name and id.
export async function currentEmployees() {
    const curEmp:Array<{name:string,value:number|null}> = [];
    await pool.query(`SELECT id, CONCAT (first_name,' ',last_name) AS fullname FROM employee`, (err:Error, result: QueryResult) => {
        if (err) { 
            console.log(err);
        } else if (result) {
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
        }
    });
    return curEmp;
};

    //returns an array of objects that contain every role's title and id
export async function currentRoles() {
    const curRoles:Array<{name:string,value:number|null}> = [];
    await pool.query('SELECT title,id FROM role', (err:Error, result: QueryResult) => {
        if (err) { 
            console.log(err);
        } else if (result) {
            for(let i = 0; i < result.rows.length; i++){                   
                curRoles.push(
                    {
                        name: result.rows[i].title,
                        value: result.rows[i].id
                    }
                );
                
            }
        }
    });
    console.log('Current Roles: '+ curRoles);
    return curRoles;
};


//Creates a new department
export async function newDept(deptName:string) {
    pool.query(`INSERT INTO department (name) ` + 
                `VALUES ($1)`,
                [deptName], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log(`${deptName} Department Added!`);
                    }                  
                }
            );
};

//Creates a New Roll
export async function newRoll(rollName:string) {
    pool.query(`INSERT INTO roll (name) ` + 
                `VALUES ($1)`,
                [rollName], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log(`${rollName} Roll Added!`);
                    }                  

                }
            );
}
