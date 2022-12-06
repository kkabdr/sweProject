const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
const {deleteAdmin,addAdmin,getAdminByEmail} = require("../models/admin")
const auth = require("./middleware")
const bcrypt = require("bcrypt")
const { addDoctor,getDoctorByEmail } = require('../models/doctor')
const { addPatient ,getPatientByEmail} = require('../models/patient')


router.post("/admin/signup", (req,res)=>{
    // if(req.body.role != 'admin'){
    //     res.status(400).json({"ok":false, "message":"unauthorized"})
    //     return
    // } 
    const regisration = req.body.registration
    console.log(regisration)
    if(!regisration){return}
    addAdmin(regisration, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("admin successfully added")
            res.status(200).json({"ok":true, "message":result.admin_id + ' ' + result.email +' added succesfully'})
        }
    })
})

router.post("/admin/signin/",(req,res)=>{
    credentials = req.body.credentials
    console.log(credentials.email)
    getAdminByEmail(credentials.email, (err,result)=>{
        if(err){
            console.log(err)
            res.status(404).json({"ok":false,"message":"Credentials error"})
        }else{
            bcrypt.compare(credentials.password, result.password, (err1, result1)=>{
                if(err1){
                    console.log(err1)
                    res.status(404).json({"ok":false,"message":"Credentials error"})
                }else{
                    // let data = '{"role":admin, "id":' +result.id + '}'
                    if(result1){
                        const token = jwt.sign({"role":"admin", "id":result.admin_id},"secret",{expiresIn:"24h",})
                    console.log("Authorized ADMIN")
                    res.status(200).json({ok:true, token:token})
                    }else{
                        res.status(404).json({"ok":false,"message":"Credentials error"})
                    }

                    
                }
            })
        }
    })
    
})



router.post("/doctor/signup",auth,(req,res)=>{
    if(req.body.role != 'admin'){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    const doctor = req.body.doctor
    console.log(doctor)
    if(!doctor){return}
    addDoctor(doctor, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("admin successfully added")
            res.status(200).json({"ok":true, "message":result.name + ' ' + result.id+' added succesfully'})
        }
    })
})

router.post("/doctor/signin/",(req,res)=>{
    credentials = req.body.credentials
    console.log(credentials)
    getDoctorByEmail(credentials.email, (err,result)=>{
        if(err){
            console.log(err)
            res.status(404).json({"ok":false,"message":"Credentials error"})
        }else{
            bcrypt.compare(credentials.password, result.password, (err1, result1)=>{
                if(err1){
                    console.log(err1)
                    res.status(404).json({"ok":false,"message":"Credentials error"})
                }else{
                    if(result1){
                        const token = jwt.sign({"role":"doctor",
                        id:result.id},"secret",{expiresIn:"24h"})
                        console.log("Authorized Doctor")
                        res.status(200).json({ok:true, token:token})
                    }else{
                        res.status(404).json({"ok":false,"message":"Credentials error"})

                    }
                    
                }
            })
        }
    })
    
})
router.post("/patient/signup",auth,(req,res)=>{
    if(req.body.role != 'admin'){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    const patient = req.body.patient
    console.log(patient)
    if(!patient){return}
    addPatient(patient, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("admin successfully added")
            res.status(200).json({"ok":true, "message":result.name + ' ' + result.id+' added succesfully'})
        }
    })
})

router.post("/patient/signin/",(req,res)=>{
    credentials = req.body.credentials
    console.log(credentials)
    getPatientByEmail(credentials.email, (err,result)=>{
        if(err){
            console.log(err)
            res.status(404).json({"ok":false,"message":"Credentials error"})
        }else{
            bcrypt.compare(credentials.password, result.password, (err1, result1)=>{
                if(err1){
                    console.log(err1)
                    res.status(404).json({"ok":false,"message":"Credentials error"})
                }else{
                    if(result1){
                        const token = jwt.sign({"role":"patient",
                        id:result.id},"secret",{expiresIn:"24h"})
                        console.log("Authorized Doctor")
                        res.status(200).json({ok:true, token:token})
                    }else{
                        res.status(404).json({"ok":false,"message":"Credentials error"})

                    }
                    
                }
            })
        }
    })
    
})

module.exports = router