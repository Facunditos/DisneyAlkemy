const jwt=require("jsonwebtoken")

function verifyToken (req,res,next) {
    const accessToken=req.headers['authorization']||req.query.accesToken
    jwt.verify(accessToken,"secreto",(error,user)=>{
        if(error) {
        res.send("Acceso denegado. Token incorrecto o experidado")
        } else {
        next() 
        }
    })
}

module.exports=verifyToken