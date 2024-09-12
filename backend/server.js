// import
import express from "express"
import dotenv from "dotenv"

// declaration
const app = express()
const port = process.env.PORT || 5000
dotenv.config()

// middlewares


// routers
app.get("/",(req,res)=>{
    res.send("Api is running...")
})

// listen
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})