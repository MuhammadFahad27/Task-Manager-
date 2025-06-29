const mongoose = require('mongoose') ;
const express = require('express') ;
const app = express() ;
const port = process.env.PORT || 3000 

const dbConnection = ()=>{

    mongoose.connect(process.env.MONGODB_URL,)
    .then(()=>{

       console.log('Data Base Connected ') ;
       app.listen(port,()=>{

        console.log(`Server Connected ${port}`)
       }) 

    })
    .catch((e)=>console.log('Error while Connecting with Data base ',e)) 



}

module.exports = dbConnection ;


