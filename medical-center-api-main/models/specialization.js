const pool = require("./db _setup")


const addSpecialization = (specialization_name, callback)=>{
    pool.query(`INSERT INTO specialization (specialization_name) VALUES ($1) RETURNING *`, 
                [specialization_name],(err,result)=>{
                    if(err){
                        console.log("AddSpecialization",err)
                        callback(true,err)
                    }else{
                        callback(false, result.rows[0])
                    }
                    // res.status(200).json({"Specialization_id":result.rows[0].id,"SpecializationName":result.rows[0].name})
                })
}

const getAllSpecializations = (callback)=>{
    pool.query(`SELECT * from specialization`,(err,result)=>{
        if(err){
            console.log("Get specializations", err)
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows)
        }

    })
}
const getSpecializationByID = (id, callback)=>{
    pool.query(`SELECT * from specialization WHERE id = $1`,[id],(err,result)=>{
        if(err){
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows[0])
        }
    })
}

const updateSpecialization = (id, specialization_name, callback)=>{
    pool.query(`UPDATE specialization SET specialization_name = $1 WHERE id = $2`, [specialization_name,id], (err,result)=>{
        if(err){
            console.log("Update Specializations", err)
            callback(true,err)
        }else{
            callback(false, result.rows[0])
        }

    })
}

const deleteSpecialization = (id, callback)=>{
    pool.query(`DELETE FROM specialization WHERE id = $1`, [id], (err,result)=>{
        if(err){
            console.log("delete Specialization")
            callback(true,err)
        }else{
            callback(false,result.rows[0])
        }
    })
}

module.exports = {deleteSpecialization,addSpecialization,getAllSpecializations, updateSpecialization,getSpecializationByID}