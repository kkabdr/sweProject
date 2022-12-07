const express = require('express')
const jwt = require('jsonwebtoken')
const router  = express.Router()
const {deleteSpecialization,addSpecialization,getAllSpecializations, updateSpecialization,getSpecializationByID} = require("../models/specialization")
const auth = require("./middleware")



router.post("/data/specialization", auth, (req,res)=>{
    if(!(req.body.role == 'admin' )){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let specialization_name = req.body.specialization_name
    addSpecialization(specialization_name, (err,result)=>{
        if(err){
            res.status(500).json({"ok":false,"message":"internal server error"})
        }else{
            console.log(result.id)
           res.status(200).json({"ok":true, "message": result.specialization_name + ' added successfully'}) 
        }
        
    })
})
router.get("/data/specialization/:id",auth,(req,res)=>{
    if(!(req.body.role == 'admin' || req.body.role == 'doctor' ||   req.body.role == 'patient')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    console.log(id)     
    console.log(getSpecializationByID(id,(err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "id":result.id, "specialization_name":result.specialization_name})
        }
          
    }))
})
router.get("/data/specializations/all",(req,res)=>{
     
    console.log(getAllSpecializations((err,result)=>{
        console.log(result)
        if(err){
            if(result.message === "Not found" ){
                res.status(404).json({ok:false, message:"Not Found"})
            }else{
                res.status(500).json({ok:false, message:"internal erver error"})
            }
            return 
        }else{
            res.status(200).json({"ok":true, "specializations":result})
        }
    }))
})

router.put("/data/specialization/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    
        updateSpecialization(id,req.body.specialization_name, (err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"updated"})
                }       
            })
})

router.delete("/data/specialization/:id", auth,(req,res)=>{
    if(!(req.body.role == 'admin')){
        res.status(400).json({"ok":false, "message":"unauthorized"})
        return
    } 
    let id = parseInt(req.params.id)
    deleteSpecialization(id,(err,result)=>{
                if(err){
                    res.status(500).json({ok:false, message:"internal server error"})
                    return
                }else{
                    res.status(200).json({ok:true, message:"deleted"})
                }       
    })
})

module.exports = router