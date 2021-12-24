const knex = require("./db")
const express = require("express")
const router = express.Router()
const {generateToken,authenticateToken} = require("./jwt")
const { JsonWebTokenError } = require("jsonwebtoken")

router.post("/signup",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined){
        res.send("name and password required")
    }else{
        knex.select("*").from("users")
        .then((data)=>{
            if(data.length<1){
            knex("users").insert(req.body)
            .then((data)=>{
                res.send("signup succesfull")
            }).catch((err)=>{
                res.send(err)
            })}else{
                res.send("user alrewady exisst")
            }
        })
    }
})

router.post("/login",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined){
        res.send('name and password are required')
    }else{
        knex.select("*").from("users")
        .then((data)=>{
            const password = req.body.password
            if(password){
                const token = generateToken(req.body)
                res.send("login successfull")
                console.log(token)
            }
        }).catch((err)=>{
            res.send(err)
            console.log(err)
        })
    }
})


router.post("/pc",authenticateToken,(req,res)=>{
    knex("city").insert(req.body)
    .then((data)=>{
        res.send("data addeed")
    }).catch((err)=>{
        res.send(err)
    })
})

router.get("/gc",authenticateToken,(req,res)=>{
    knex.select("*").from("city")
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})


module.exports = router

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJyYW11ayIsInBhc3N3b3JkIjoic2FtcGF0aCJ9LCJpYXQiOjE2NDAzNTk4MzF9.erfyNTiX6WyE5icobqWMt2fkL4mRdW3lbE3VSwp1Xck