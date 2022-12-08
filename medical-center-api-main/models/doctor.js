const pool = require("./db _setup")
const bcrypt = require("bcrypt")
const salt = 10

const getAllDoctors = (callback)=>{
    pool.query(`SELECT D.name,D.surname,D.number,S.specialization_name, Dep.department_name 
                from doctor D
                inner join department Dep
                on D.department_id = Dep.id
                inner join specialization S
                on D.specialization_id =  S.id`,(err,result)=>{
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

const addDoctor =  (data,callback) =>{
    bcrypt.hash( data.password, salt, (err, hash)=>{
        if(err){
            console.log("add ",err)
            callback(true, err)
        }else{

            pool.query(`INSERT INTO doctor (
                dateofbirth,
                iin,
                name,
                surname,
                middlename,
                address,
                email,
                number,
                password,
                department_id,
                specialization_id,
                experience,
                category,
                price,
                degree,
                rating,
                state_id
                )
                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING * `, 
                        [   data.dateofbirth,
                            data.iin,
                            data.name,
                            data.surname,
                            data.middlename,
                            data.address,
                            data.email,
                            data.number,
                            hash,
                            data.department_id,
                            data.specialization_id,
                            data.experience,
                            data.category,
                            data.price,
                            data.degree,
                            data.rating,
                            data.state_id,
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

function getDoctorByEmail(email, callBack){
    pool.query(`SELECT id,name, surname, email, number, password
            FROM doctor
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

const getDoctorByID = (id, callback) =>{
    pool.query(`SELECT doctor.id,dateofbirth,
    iin,
    name,
    surname,
    middlename,
    address,
    email,
    number,
    state_id,
    D.department_name,
    S.specialization_name,
    department_id,
    specialization_id,
    experience,
    category,
    price,
    degree,
    rating FROM doctor 
    inner join department D 
    on doctor.department_id = D.id
    inner join specialization S
    on doctor.specialization_id = S.id
    WHERE doctor.id = $1`, [id],(err,result)=>{
        if(err){
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows[0])
        }
    })
}

const getDoctorWithFilter = (filter,callback)=>{
    pool.query(`select D.id,D.name,D.surname,S.specialization_name,Dep.department_name
    from doctor D
    inner join department Dep
    on D.department_id = Dep.id
    inner join specialization S
    on D.specialization_id = S.id
    where (
        ((lower(D.name) Like lower($1)))
        or
        (
            ((lower(D.surname) Like lower($1)))
            )
        )
    AND (Dep.id = $2 or ($2 is null))
    AND (S.id = $3 or ($3 is null))`, ['%' + filter.name +'%',filter.department_id, filter.specialization_id], (err,result)=>{
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

function updateDoctor(id, data, callback){
    
    bcrypt.hash( data.password, salt, (err, hash)=>{
        if(err){
            console.log("update doctor ",err)
            callback(true, err)
        }else{
            pool.query(`UPDATE doctor SET 
            dateofbirth = $1,
            iin = $2,
            name = $3,
            surname = $4,
            middlename = $5,
            address = $6,
            email = $7,
            number = $8,
            password = $9,
            department_id = $10,
            specialization_id = $11,
            experience = $12,
            category = $13,
            price = $14,
            degree = $15,
            rating = $16,
            state_id = $18

            Where id = $17`
            ,[data.dateofbirth,
                data.iin,
                data.name,
                data.surname,
                data.middlename,
                data.address,
                data.email,
                data.number,
                hash,
                data.department_id,
                data.specialization_id,
                data.experience,
                data.category,
                data.price,
                data.degree,
                data.rating,
                id,
                data.state_id], (err, result)=>{
                    if(err){
                        callback(true,err)
                    }else{
                        callback(false, result.rows)
                    }
            })
    }})
}

const deleteDoctor = (id, callback)=>{
    pool.query(`DELETE FROM doctor WHERE id = $1`, [id], (err,result)=>{
        if(err){
            console.log("delete doctor")
            callback(true,err)
        }else{
            callback(false,result.rows[0])
        }
    })
}

module.exports = {getDoctorWithFilter,deleteDoctor,getDoctorByEmail,addDoctor,getAllDoctors,getDoctorByID,updateDoctor}