const pool = require("./db _setup")
const bcrypt = require("bcrypt")
const salt = 10


const getAllPatient = (callback)=>{
    pool.query(`SELECT id,dateofbirth,
    iin,
    name,
    surname,
    middlename,
    address,
    email,
    number,
    blood_group,
    emergency_contact,
    martial_status,
    other,
    state_id
    from patient
    `,(err,result)=>{
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
const getPatientWithFilter = (filter,callback)=>{
    pool.query(`select id, name, surname,dateofbirth, blood_group, number,state_id
    from patient 
    where (
        ((lower(name) Like lower($1)))
        or
        (
            ((lower(surname) Like lower($1)))
            )
        )`, ['%' + filter.name +'%'], (err,result)=>{
        if(err){
            console.log("filterdoctor\n",err)
            callback(true,"internal server error")
        }else if(result.rows.length === 0){
            callback(true,"not found")
        }else{
            callback(false, result.rows)
        }
    })
}

const addPatient =  (data,callback) =>{
    bcrypt.hash( data.password, salt, (err, hash)=>{
        if(err){
            console.log("add ",err)
            callback(true, err)
        }else{

            pool.query(`INSERT INTO patient (
                dateofbirth,
                iin,
                name,
                surname,
                middlename,
                address,
                email,
                number,
                password,
                blood_group,
                emergency_contact,
                martial_status,
                other,
                state_id
                )
                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING * `, 
                        [   data.dateofbirth,
                            data.iin,
                            data.name,
                            data.surname,
                            data.middlename,
                            data.address,
                            data.email,
                            data.number,
                            hash,
                            data.blood_group,
                            data.emergency_contact,
                            data.marital_status,
                            data.other,
                            state_id
                        ],(err,result)=>{
                                if(err){
                                    console.log("Add Admin",err)
                                    callback(true,err)
                                }else{
                                    callback(false,result.rows[0])
                                }
        })
    }
})}   

function getPatientByEmail(email, callBack){
    pool.query(`SELECT id, name, surname, email, number, password
            FROM patient
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

const getPatientByID = (id, callback) =>{
    pool.query(`SELECT id,dateofbirth,
    iin,
    name,
    surname,
    middlename,
    address,
    email,
    number,
    blood_group,
    emergency_contact,
    martial_status,
    other,
    state_id
     FROM patient WHERE id = $1`, [id],(err,result)=>{
        if(err){
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows[0])
        }
    })
}



function updatePatient(id, data, callback){
    
    bcrypt.hash( data.password, salt, (err, hash)=>{
        if(err){
            console.log("update patient ",err)
            callback(true, err)
        }else{
            pool.query(`UPDATE patient SET 
            dateofbirth = $1,
            iin = $2,
            name = $3,
            surname = $4,
            middlename = $5,
            address = $6,
            email = $7,
            number = $8,
            password = $9,
            blood_group = $10,
            emergency_contact = $11,
            martial_status = $12,
            other= $13
            state_id = $15

            Where id = $14`
            ,[data.dateofbirth,
                data.iin,
                data.name,
                data.surname,
                data.middlename,
                data.address,
                data.email,
                data.number,
                hash,
                data.blood_group,
                data.emergency_contact,
                data.martial_status,
                data.other,id,data.state_id], (err, result)=>{
                    if(err){
                        console.log(err)
                        callback(true,err)
                    }else{
                        callback(false, result.rows)
                    }
            })
    }})
}

const deletePatient = (id, callback)=>{
    pool.query(`DELETE FROM patient WHERE id = $1`, [id], (err,result)=>{
        if(err){
            console.log("delete doctor")
            callback(true,err)
        }else{
            callback(false,result.rows[0])
        }
    })
}
module.exports = {deletePatient,getPatientWithFilter,getPatientByEmail,addPatient,getAllPatient,getPatientByID,updatePatient}