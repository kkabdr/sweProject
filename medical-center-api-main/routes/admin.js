const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
const {deleteAdmin,addAdmin,getAdminByEmail} = require("../models/admin")
const auth = require("./middleware")
const bcrypt = require("bcrypt")

router.post("/admin/signup",  (req,res)=>{
    const regisration = req.body.registration
    console.log(regisration)
    if(!regisration){return}
    addAdmin(regisration, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("admin successfully added")
            res.status(200).json({"ok":true, "result":result})
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
                    const token = jwt.sign({"role":"admin",
                        id:result.admin_id},"secret",{expiresIn:"24h"})
                    console.log("Authorized")
                    res.status(200).json({ok:true, token:token})
                }
            })
        }
    })
    
})
router.delete("/admin/admin/:id",auth, (req,res)=>{
    if(req.body.role != 'admin'){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deleteAdmin(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router