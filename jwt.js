const jwt = require("jsonwebtoken")

function generateToken(user){
    return jwt.sign({user},"SAMPATH kumar")
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,"SAMPATH kumar",(err,data)=>{
        console.log(err)
        if(err) return res.send(err)
        req.data = data
        
        next()
    })
}

module.exports = {generateToken,authenticateToken}