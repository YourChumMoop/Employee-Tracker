
//TODO functions for building quieries for SQL database

export const buildViewQ = (table:string) => {
    return `SELECT * FROM ${table}`;
} 


//VIEW ALL function that takes table as a param
//ADD function
export const newEmpQ = (first_name:string,last_name:string,role_id:string,manager_id:string) => {
    return `INSERT INTO employee (first_name,last_name,role_id,manager_id) ` + 
                `VALUES (${first_name},${last_name},${role_id},${manager_id};)`; 
};
//UPDATE function
