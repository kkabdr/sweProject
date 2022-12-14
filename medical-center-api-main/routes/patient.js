const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
// const {deleteAdmin,addAdmin,getAdminByEmail} = require("../models/admin")
const auth = require("./middleware")
const bcrypt = require("bcrypt")
const { deletePatient, getAllPatient, getPatientByID, updatePatient, getPatientWithFilter } = require('../models/patient')
const { getAllAppointmentsOfPatient } = require('../models/appointment')

router.get("/data/patients/all",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor'||req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    console.log(getAllPatient((err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(200).json({ok:false, "patients":[]})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "patients":result})
        }
    }))
})

router.get("/data/patients/",auth,(req,res)=>{
    let name = req.query.name
    let filter = {
        "name":name
    }
    console.log(filter)
    getPatientWithFilter(filter,(err,result)=>{
        if(err){
            if(result === 'not found'){
                res.status(200).json({"ok":true, "patients":[]})    
            }else{
                res.status(404).json({"ok":false, "message":"not found"})
            }
        }else{
            res.status(200).json({"ok":true, "patients":result})    
        }
    })
})

router.get("/data/patient/:id",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor'||req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    console.log(id)     
    console.log(getPatientByID(id,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "patient":result})
        }
          
    }))
})
router.get("/data/appointments/patient/:id",auth, (req,res)=>{
    if(!(req.body.role == 'admin' ||req.body.role=='doctor' ||req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    let visited = req.query.visited
    console.log(id)     
    console.log(getAllAppointmentsOfPatient(id,visited,(err,result)=>{
        // console.log(result)
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

router.put("/data/patient/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
        let patient = req.body.patient
        console.log(patient, id)
        updatePatient(id,patient, (err,result)=>{
                if(err){
                    console.log("here")
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"updated"})
                }       
            })
})

router.delete("/data/patient/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin' )){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deletePatient(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router