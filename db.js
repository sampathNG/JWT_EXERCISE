const knex = require("knex")({
    client: "mysql2",
    connection : {
        host: "localhost",
        user: "kumar",
        database: "blog2",
        password: "Sampath@123"
    }
})

knex.schema.createTable("users",(t)=>{
    t.increments("id").primary(),
    t.string("name"),
    t.integer("age"),
    t.string("password")
}).then((data)=>{
    console.log("table created")
}).catch((err)=>{
    console.log("already created")
})

knex.schema.createTable("city",(t)=>{
    t.increments("id").primary(),
    t.string("name"),
    t.integer("rank"),
    t.string("state")
}).then((data)=>{
    console.log("table created")
}).catch((err)=>{
    console.log("already created")
})

module.exports = knex;