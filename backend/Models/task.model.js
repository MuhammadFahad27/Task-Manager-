const mongoose = require('mongoose') ;

const taskSchema = new mongoose.Schema({


    title:{

        type:String , 
        required:true ,
        unique:true 
    },
    description:{

        type:String , 
        required:true ,
        unique:true 
    },
    status:{

        type:String , 
        required:true , 
        default:'pending',
        enum:['pending','completed','cancelled']
    },
    dueDate:{

        type:Date ,
        required:true  
    } , 
    user:{

        type:mongoose.Schema.ObjectId ,
        ref:'User',
        required:true 
    }

},{timestamps:true})

const Task = mongoose.model('Task',taskSchema) ;

module.exports = Task