const pool = require("./db _setup")
const bcrypt = require("bcrypt")
const salt = 5

function getUserByID(id, callBack){
    pool.query(`SELECT role_id, name, surname,middlename, "dateOfBirth", number,address,email,state_id,iin
            FROM user1
            WHERE user1.id = $1`,[id], (err,result)=>{
                if(err){
                    console.log("get user by id", err)
                    callBack(true,err)
                }else if(result.rows.length === 0 ){
                    callBack(true, new Error("Not found"))
                }else {
                    callBack(false, result.rows[0])
                }
    })
        
    
}

function checkPassword(email,password, callback){
    pool.query(`SELECT user1.id, user1.email, user1.password, user1.role_id, role.id
    FROM user1
    INNER JOIN public.role
    ON user1.role_id = public.role.id
    where public.role.id=2`,(err,result)=>{
        if(err){
            callback(true, err)
        }else if(result.rows.length === 0) {
            callback(true, new Error("Not Found"))
        }else{
            // console.log(result.rows)
            if(result.rows[0].email != email){
                callback(true, new Error("Not Found"))
                return 
            }

            bcrypt.compare(password, result.rows[0].password, (err, res)=>{
                if(res){
                    callback(false, result.rows[0].id)
                }else{
                    callback(true, new Error("Not Found"))
                }
            })
        }
    })
}

function updateUser(id, data, callback){
    baseInfo = data.baseInfo
    pool.query(`UPDATE user1 SET 
                name = $1,
                surname = $2,
                middlename = $3,
                "dateOfBirth" = $4,
                number = $5,
                address = $6,
                email = $7,
                state_id = $8,
                iin = $9
                WHERE user1.id = $10`,
                [baseInfo.name,   baseInfo.surname,   baseInfo.middlename,baseInfo.dateOfBirth, 
                    baseInfo.contactNumber,baseInfo.address , baseInfo.email,  baseInfo.stateID,   baseInfo.iin,id], 
                    (err, result)=>{
                        if(err){
                            callback(true,err)
                        }else{
                            callback(false, result.rows)
                        }
                })
}

function addUser(data,res,addFurther){
    
    baseInfo = data.baseInfo

    console.log(data.specificInfo)
    bcrypt.hash( baseInfo.password, salt, (err, hash)=>{
        if(err){
            console.log("add user",err)
            res.status(500).json({"message":"internal server error hash"})
        }
        pool.query(
            `INSERT INTO user1 ("dateOfBirth",role_id,number,name, surname, middlename, address, email, state_id,iin, password)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`, 
            [      baseInfo.dateOfBirth,baseInfo.role_id, baseInfo.contactNumber,baseInfo.name,   baseInfo.surname,   baseInfo.middlename, 
               baseInfo.address , baseInfo.email,  baseInfo.stateID,   baseInfo.iin, hash ]
            ,(err,result)=>{
                if(err){
                    console.log("Add User",err)
                    res.status(500).json({"message":"internal server error sql error"})
                    return
                }else{
                    console.log(result)
                    addFurther(data.specificInfo,res,result.rows[0].id)
                }
                
        })
    })
}
function deleteUser(id,callback){
    pool.query(`DELETE FROM user1 WHERE user1.id = $1`,[id], (err,result)=>{
        if(err){
            callback(true, err)
        }else{
            callback(false, result.rows)
        }
        
    })
}

module.exports = {addUser,getUserByID,deleteUser,updateUser,checkPassword}