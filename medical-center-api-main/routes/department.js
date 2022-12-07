const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
const {deleteDepartment,addDepartment,getAllDepartments, updateDepartment,getDepartmentByID} = require("../models/department")
const auth = require("./middleware")

router.post("/data/department", auth, (req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    const department_name = req.body.department_name
    console.log(department_name)
    addDepartment(department_name, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"ok":false, "message":err.message})
        }else{
            console.log("Department successfully added")
            res.status(200).json({"ok":true, "message":result.department_name + ' added succesfully'})
        }
    })
})

router.get("/data/department/:id",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor'||req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    console.log(id)     
    console.log(getDepartmentByID(id,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "id":result.id,"department_name":result.department_name})
        }
          
    }))
})
router.get("/data/departments/all",(req,res)=>{
    
    console.log(getAllDepartments((err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "departments":result})
        }
    }))
})

router.put("/data/department/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    
        updateDepartment(id,req.body.department_name, (err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"updated"})
                }       
            })
})

router.delete("/data/department/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deleteDepartment(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router