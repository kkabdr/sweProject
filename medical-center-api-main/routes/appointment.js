const express = require('express')
const jwt = require('jsonwebtoken')
const { addAppointment,getAppointmentByID,updateAppointment,deleteAppointment } = require('../models/appointment')
const router  = express.Router()
const {deleteDepartment,addDepartment,getAllDepartments, updateDepartment,getDepartmentByID} = require("../models/department")
const auth = require("./middleware")

router.post("/data/appointment", auth, (req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    const appointment = req.body.appointment
    console.log(req.body)
    addAppointment(appointment, (err,result)=>{
        if(err){
            console.log(err)
            
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("Appointment successfully added")
            res.status(200).json({"ok":true, "appointment_id":result.id + ' added succesfully'})
        }
    })
})


router.get("/data/appointment/:id",auth,(req,res)=>{
     
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    console.log(id)     
    console.log(getAppointmentByID(id,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "appointment":result})
        }
          
    }))
})

router.put("/data/appointment/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    const appointment = req.body.appointment
        updateAppointment(id,appointment, (err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"updated"})
                }       
            })
})

router.delete("/data/appointment/:id", (req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deleteAppointment(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router