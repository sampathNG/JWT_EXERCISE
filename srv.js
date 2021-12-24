const express = require("express")
const app = express()
app.use(express.json())
const ls = require("./ls") 
app.use("/",ls)

app.listen(6000,console.log("running on port 6000"))