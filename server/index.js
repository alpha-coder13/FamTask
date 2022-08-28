const  DATABASE_POPULATOR = require("./db/populator.db")
const apiRouter = require("./api");
const express = require('express')
const app=express()
const cors=require('cors')

DATABASE_POPULATOR() //initial fetcher

setInterval(DATABASE_POPULATOR,120000) // fetches at intervals of every 2  minutes 

app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).json("up and running");
})


app.use("/api", apiRouter);

app.listen(8000,()=>{
})