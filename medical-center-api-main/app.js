const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())
app.use("/api/auth/", require("./routes/authorization"))
app.use("/api/admin/", require("./routes/admin"))
app.use("/api/", require("./routes/doctor"))
app.use("/api/", require("./routes/patient"))
app.use("/api/", require("./routes/department"))
app.use("/api/", require("./routes/specialization"))
app.use("/api/",require("./routes/appointment"))

app.get("/", (req,res)=>{
    console.log('Conected')
    res.json({"message":"Connected Successfully"})
})





// app.post("/api/auth/signup", (req,res)=>{
//     console.log("register attempt")
//     console.log(req)
// })
// app.post("/api/auth/signin", (req,res)=>{
    
//     console.log("login attempt")
//     console.log(req)
// })

app.listen(4000,()=>{
    console.log("Server is runnign on port 4000")
})