const pool = require("./db _setup")


const addDepartment = (department_name, callback)=>{
    pool.query(`INSERT INTO department (department_name) VALUES ($1) RETURNING *`, 
                [department_name],(err,result)=>{
                    if(err){
                        console.log("Add department error",err)
                        callback(true,err)
                    }else{
                        callback(false, result.rows[0])
                    }
    })
}

const getAllDepartments = (callback)=>{
    pool.query(`SELECT * from department`,(err,result)=>{
        if(err){
            console.log("Get department", err)
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows)
        }

    })
}
const getDepartmentByID = (id, callback)=>{
    pool.query(`SELECT * from department WHERE id = $1`,[id],(err,result)=>{
        if(err){
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows[0])
        }
    })
}

const updateDepartment = (id, new_department_name, callback)=>{
    pool.query(`UPDATE department SET department_name = $1 WHERE id = $2`, [new_department_name,id], (err,result)=>{
        if(err){
            console.log("Update Department", err)
            callback(true,err)
        }else{
            callback(false, result.rows[0])
        }

    })
}

const deleteDepartment = (id, callback)=>{
    pool.query(`DELETE FROM department WHERE id = $1`, [id], (err,result)=>{
        if(err){
            console.log("Delete Department")
            callback(true,err)
        }else{
            callback(false,result.rows[0])
        }
    })
}

module.exports = {deleteDepartment,addDepartment,getAllDepartments, updateDepartment,getDepartmentByID}