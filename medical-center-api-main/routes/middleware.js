const jwt = require("jsonwebtoken")

const verify = (req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
    if(!token){
        return res.status(403).json({ok:false, message:"A token is requried"})
    }
    try{
        console.log(token)
         const decoded = jwt.verify(token, "secret")
        console.log(decoded)
        req.body.role = decoded.role
        req.body.user_id = decoded.id
    }catch(err){
        console.log(err)
        return res.status(401).json({ok:false, message:"invalid tokem"})
    }
    req.body.role = 'admin'
    console.log("connected")
    return next()
}

module.exports = verify