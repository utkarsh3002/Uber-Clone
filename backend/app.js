const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const connectToDb=require('./db/db')
const userRoute =require('./routes/user.route')

connectToDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.send("hi")
    console.log("hello")
})
app.use('/users',userRoute)

module.exports=app