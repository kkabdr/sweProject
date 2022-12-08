const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
// const {deleteAdmin,addAdmin,getAdminByEmail} = require("../models/admin")
const auth = require("./middleware")
const bcrypt = require("bcrypt")
const { getAllDoctors, deleteDoctor, updateDoctor, getDoctorByID, getDoctorWithFilter } = require('../models/doctor')
const { getAllAppointmentsOfDoctor, markAppointmentVisited } = require('../models/appointment')

router.get("/data/doctors/all",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    console.log(getAllDoctors((err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "doctors":result})
        }
    }))
})

router.get("/data/doctor/:id",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    console.log(id)     
    console.log(getDoctorByID(id,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "doctor":result})
        }
          
    }))
})

router.post("/data/appointments/:id",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    }
    let id = parseInt(req.params.id)
    console.log(id)
    markAppointmentVisited(id,(err,result)=>{
        if(err){
            res.status(500).json({"ok":false,"message":"error"})
        }else{
            res.status(200).json({"ok":true})
        }
    })
})

router.get("/data/appointments/doctor/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    
    let name = ""
    let visited = null
    let cause = ""
    if(typeof req.query.name !== 'undefined'){
        name = req.query.name
    }
    if(req.query.visited !== ""){
        visited = req.query.visited
    }
    if(req.query.cause !== ""){
        cause = req.query.cause
    }
    let id = parseInt(req.params.id)
    const  filter={
        "name":name,
        "visited":visited,
        "id":id,
        "cause":cause

    }
    console.log(filter)     
    console.log(getAllAppointmentsOfDoctor(filter,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(200).json({"ok":true, "appointments":[]})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "appointments":result})
        }
          
    }))
})

router.get("/data/doctors/search", auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' || req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let name = ""
    let department_id = null
    let specialization_id = null
    if(typeof req.query.name !== 'undefined'){
        name = req.query.name
    }
    console.log(req.query.department_id, )
    if(req.query.department_id !== ''){
        department_id = req.query.department_id
    }if(req.query.specialization_id !== ''){
        specialization_id = req.query.specialization_id
    }
    const  filter={
        "name":name,
        "department_id":department_id,
        "specialization_id":specialization_id
    }
    console.log(filter)
    getDoctorWithFilter(filter,(err,result)=>{
        if(err){
            if(result==='not found'){
                res.status(200).json({"ok":true,"doctors":[]})
            }else{
                res.status(404).json({"ok":false,"message":err})
            }
        }else{
            res.status(200).json({"ok":true,"doctors":result})
        }
    })
})

router.put("/data/doctor/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":true, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
        let doctor = req.body.doctor
        updateDoctor(id,doctor, (err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"updated"})
                }       
            })
})

router.delete("/data/doctor/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deleteDoctor(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router