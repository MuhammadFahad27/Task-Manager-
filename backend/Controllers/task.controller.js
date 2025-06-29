const { handleError } = require("../Middleware/error")
const Task = require("../Models/task.model")

const createTask = async (req,res,next)=>{

    try {

        const {

            title , 
            description , 
            dueDate,
            
        } = req.body 


        if(!title || !description  || !dueDate){

            return next(handleError(400,'All Fields are required'))
        }


        

        const check_task = await Task.findOne({title,user: req.user.id}) ;

        if(check_task){

            return next(handleError(400,'Task Already Exist')) ;
        }

        const newTask = await Task.create({

            title , 
            description , 
            dueDate,
            user:req.user.id
        })

        return res.status(201).json({

            success:true , 
            message:'Task Created ',
            newTask 
        })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }


}
const readTask = async (req,res,next)=>{

    try {

       

    const allTask = await Task.find({user:req.user.id}) ;

    return res.status(200).json({

        success:true , 
        allTask 
    })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }

    
}
const updateTask = async (req,res,next)=>{

    
    try {

        const {

            title , 
            description ,
            status , 
            dueDate ,
           
             
            
        } = req.body 

        const {id} = req.params

        if(!id){

            return next(handleError(400,'Select Task'))
        }

        
        

       const update_Task = {} ;

       if(title) {

            update_Task.title = title 
       }
        if(description) {

            update_Task.description = description 
       } 
       if(status) {

            update_Task.status = status 
       }
        if(dueDate) {

            update_Task.dueDate = dueDate 
       } 

        

        const check_task = await Task.findById(id) ;

         if(!check_task){

            return next(handleError(404,'Task not found ')) ;
        }

        if(check_task.user.toString() !== req.user.id){

             return next(handleError(403, 'Access Denied'));
        }

       

        const task_updated = await Task.findByIdAndUpdate(id,update_Task,{new:true})

        return res.status(200).json({

            success:true , 
            message:'Task updated  ',
            task_updated 
        })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }


    
}
const deleteTask = async (req,res,next)=>{

    try {

         const {

          
            id ,
           
             
            
        } = req.body 

        if(!id){

            return next(handleError(400,'All fields are required'))
        }

        const find_task = await Task.findById(id) ;

        if(!find_task){

             return next(handleError(400,'task not found'))
        }

        if(find_task.user.toString() !== req.user.id){

             return next(handleError(403, 'Access Denied'));
        }

        const delete_task = await Task.findByIdAndDelete(id) ;

    return res.status(200).json({

        success:true , 
        message:'Task Deleted' 
    })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }

    

    
}

const singleTask = async (req,res,next)=>{

    
    try {

        const {id} = req.params 

       

        const task = await Task.findById(id) ;

         if(task.user.toString() !== req.user.id){

             return next(handleError(403, 'Access Denied'));
        }

    return res.status(200).json({

        success:true , 
        task
    })
        
    } catch (error) {
        return next(handleError(500,error))
    }


}

module.exports = {

    createTask , 
    readTask , 
    updateTask , 
    deleteTask,
    singleTask
}