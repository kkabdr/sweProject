const pool = require("./db _setup")


const addAppointment = (appointment, callback)=>{
    pool.query(`INSERT INTO appointment (patient_id,doctor_id,appointment_date,appointment_time_from,appointment_time_to,other) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, 
                [appointment.patient_id,appointment.doctor_id,appointment.appointment_date,appointment.appointment_time_from,appointment.appointment_time_to,appointment.other],(err,result)=>{
                    if(err){
                        console.log("AddAppointment",err)
                        callback(true,err)
                    }else{
                        callback(false, result.rows[0])
                    }
                })
}

const getAllAppointmentsOfDoctor = (id,callback)=>{
    pool.query(`SELECT A.id, P.name as patient_name,P.surname as patient_surname, A.appointment_date, A.appointment_time_from, A.appointment_time_to,A.visited
        from appointment A
        inner join doctor D
        on D.id = A.doctor_id       
        inner join patient P 
        on P.id = A.patient_id
        where D.id = $1
        Order by A.appointment_date Desc
     `,[id],(err,result)=>{
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

const markAppointmentVisited = (id,callback)=>{
    pool.query(`UPDATE appointment SET 
    visited=1
    WHERE id = $1`, [id], (err,result)=>{
    if(err){
        console.log("Update appointment", err)
        callback(true,err)
    }else{
        callback(false, result.rows[0])
    }

})
}

const getAllAppointmentsOfPatient = (id,callback)=>{
    pool.query(`SELECT A.id, D.name as doctor_name,D.surname as doctor_surname, S.specialization_name, Dep.department_name, A.appointment_date, A.appointment_time_from, A.appointment_time_to,A.visited
        from appointment A
        inner join doctor D
        on D.id = A.doctor_id
        inner join department Dep
        on Dep.id= D.department_id
        inner Join specialization S
        on S.id = D.specialization_id       
        inner join patient P 
        on P.id = A.patient_id
        where P.id = $1
        Order by A.appointment_date Desc
     `,[id],(err,result)=>{
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

const getAppointmentByID = (id, callback)=>{
    pool.query(`SELECT A.id, P.name as patient_name,P.surname as patient_surname, D.name as doctor_name,D.surname as doctor_surname, A.appointment_date, A.appointment_time_from, A.appointment_time_to,A.other,A.visited
    from appointment A
    inner join doctor D
    on D.id = A.doctor_id       
    inner join patient P 
    on P.id = A.patient_id
    where A.id = $1`,[id],(err,result)=>{
        if(err){
            callback(true,err)
        }else if(result.rows.length === 0){
            callback(true, new Error("Not found"))
        }else{
            callback(false, result.rows[0])
        }
    })
}

const updateAppointment = (id, data, callback)=>{
    pool.query(`UPDATE appointment SET 
            appointment_date=$1,
            appointment_time_from=$2,
            appointment_time_to=$3,
            other=$4,
            visited=$5
     WHERE id = $6`, [data.appointment_date,data.appointment_time_from,data.appointment_time_to,data.other,data.visited,id], (err,result)=>{
        if(err){
            console.log("Update appointment", err)
            callback(true,err)
        }else{
            callback(false, result.rows[0])
        }

    })
}

const deleteAppointment = (id, callback)=>{
    pool.query(`DELETE FROM appointment
     WHERE id = $1`, [id], (err,result)=>{
        if(err){
            console.log("delete Specialization")
            callback(true,err)
        }else{
            callback(false,result.rows[0])
        }
    })
}

module.exports = {markAppointmentVisited,addAppointment,getAllAppointmentsOfDoctor,getAllAppointmentsOfPatient,getAppointmentByID,updateAppointment,deleteAppointment}