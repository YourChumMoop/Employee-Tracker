import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';
await connectToDb();
//TODO functions for building quieries for SQL database

// VIEW FUNCTION
// Returns a table containing all information from specified table
export async function viewTable(table:string) {
    //make a postgres query to select the table
    await pool.quary(`SELECT * FROM $1`, [table], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else if (result) {
            console.table(result.rows);
        }
        this.mainMenu();
    });
}

//ADD function
export const newEmp = (first_name:string,last_name:string,role_id:string,manager_id:string) => {
    pool.quary(`INSERT INTO employee (first_name,last_name,role_id,manager_id) ` + 
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

//returns an array of objects that contain every employee's full name and id.
export async function currentEmployees() {
    const curEmp:Array<{name:string,value:number|null}> = [];
    await pool.quary(`SELECT id, CONCAT (first_name,' ',last_name) AS fullname FROM employee`, (err:Error, result: QueryResult) => {
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
    await pool.quary('SELECT title,id FROM role', (err:Error, result: QueryResult) => {
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
    return curRoles;
};

export async function updateEmployeeRole(empId:number,roleId:number) {
    pool.quary(`UPDATE employee SET role_id = $1 WHERE id = $2`,[roleId,empId], (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Role Updated!");
        }
    });
};

export async function newDept(deptName:string) {
    pool.quary(`INSERT INTO department (name) ` + 
                `VALUES ($1)`,
                [deptName], (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log(`${deptName} Department Added!`);
                    }                  
                }
            );
}
//UPDATE function
// export const updateQ 