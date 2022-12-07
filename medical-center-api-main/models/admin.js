const pool = require("./db _setup")
const bcrypt = require("bcrypt")
const salt = 10

function getAdminByEmail(email, callBack){
    pool.query(`SELECT admin_id as id,name, surname, email, number, password
            FROM administration
            WHERE email = $1`,[email], (err,result)=>{
                if(err){
                    console.log("get admin with email", err)
                    callBack(true,err)
                }else if(result.rows.length === 0 ){
                    callBack(true, new Error("Not found"))
                }else {
                    console.log(result.rows)
                    callBack(false, result.rows[0])
                }
    })
}

function getAdminByID(id,callBack){
    pool.query(`SELECT admin_id as id,name, surname, email, number
            FROM administration
            WHERE admin_id = $1`,[id], (err,result)=>{
                if(err){
                    console.log("get admin with id", id , err)
                    callBack(true,err)
                }else if(result.rows.length === 0 ){
                    callBack(true, new Error("Not found"))
                }else {
                    console.log(result.rows)
                    callBack(false, result.rows[0])
                }
    })
}



function addAdmin(regisration,callback){
    console.log(regisration.password)
    bcrypt.hash( regisration.password, salt, (err, hash)=>{
        if(err){
            console.log("add user",err)
            callback(true, err)
        }else{
            pool.query(
                `INSERT INTO administration (name,surname,email,number,password)
                VALUES ($1,$2,$3,$4,$5) RETURNING admin_id,email`, 
                [ regisration.name,regisration.surname,regisration.email,regisration.number, hash ]
                ,(err,result)=>{
                    if(err){
                        console.log("Add Admin",err)
                        callback(true,err)
                    }else{
                        callback(false,result.rows[0])
                    }
                         
            })
        }   
    })
}
function deleteAdmin(id,callback){
    pool.query(`DELETE FROM administration WHERE admin_id = $1`,[id], (err,result)=>{
        if(err){
            callback(true, err)
        }else{
            callback(false, result.rows)
        }
        
    })
}

module.exports = {getAdminByID,deleteAdmin, addAdmin, getAdminByEmail}