const dotenv = require("dotenv").config({}) 
const express = require('express')
const app = express() ;
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnection = require('./DataBase/config');
const cookieParser = require('cookie-parser')
const authRoutes = require('./Routes/auth.route')
const taskRoutes = require('./Routes/task.route')


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

// dbConnection()
const port = process.env.PORT || 3000 

mongoose.connect(process.env.MONGODB_URL,)
    .then(()=>{

       console.log('Data Base Connected ') ;
       app.listen(port,()=>{

        console.log(`Server Connected ${port}`)
       }) 

    })
    .catch((e)=>console.log('Error while Connecting with Data base ',e)) 

app.use('/api/v1',authRoutes)
app.use('/api/v1',taskRoutes)

app.use((err,req,res,next)=>{   

    const statusCode = err.statusCode || 500 
    const message = err.message || 'Server Error' 
    
    return res.status(statusCode).json({

        success:false ,
        statusCode, 
        message 
    })



})




