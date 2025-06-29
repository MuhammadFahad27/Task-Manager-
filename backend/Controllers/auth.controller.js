const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs') ;
const { handleError } = require('../Middleware/error');
const User = require('../Models/user.model');


const signUp = async(req,res,next)=>{

   
    try {

        const {
        username,
        email , 
        password 
    } = req.body ;

    if(!username || !email || !password ){

        return next(handleError(400,'All Fields are required'))
    }

    const check_User = await  User.findOne({email}) ;

    if(check_User){

        return next(handleError(400,'User Already Exist'))
    }

    const hashedPassword = await  bcrypt.hash(password , 10) 

    const user = await User.create({

        username , 
        email , 
        password:hashedPassword
    })

    return res.status(200).json({

        success:true , 
        message:'Sign Up Successfully ',
       
    })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }



}
const signIn = async(req,res,next)=>{

    try {

         const {
       
        email , 
        password 
    } = req.body ;

      if(!email || !password ){

        return next(handleError(400,'All Fields are required'))
    }

    const find_email = await User.findOne({email})

    if(!find_email){

        return next(handleError(404,'User not found'))
    }

    const check_password = await bcrypt.compare(password,find_email.password) ;

    if(!check_password){

        return   next(handleError(400,'Invalid Credentials'))
    }

    const token = jwt.sign({

        id:find_email._id,
        email:find_email.email ,
      

    },process.env.JWT_SECRET_KEY)

     return res.cookie('task_token',token,{

            httpOnly:true,
            secure:process.env.NODE_ENV == "production",
            sameSite:process.env.NODE_ENV == "production" ? 'none':'strict' ,
            path:'/'

        })
        .status(200).json({success:true ,
         message:'successfully sign-in',
          User:{
            
            email:find_email.email ,
            username : find_email.username 
        }

        
        
        })



        
    } catch (error) {
        
        return next(handleError(500,'Server Error'))
    }


    

}

const signOut = (req,res,next)=>{

    try {

        return res.clearCookie('task_token').status(200).json({

        success:true , 
        message:'Sign-out'
    })
        
    } catch (error) {
        return next(handleError(500,'Server Error'))
    }

  
}

const checkAuth = async (req,res,next)=>{

   try {

          const token = req.cookies.access_token ;
    
        if(!token){
    
            return res.json({
                success:false ,
                isAuthenticated: false
            })
        }

        return res.status(201).json({

            success:true 
            
        })

      
        
    } catch (error) {
        next(handleError(500,'Server Error'))
    }

}


module.exports = {

    signUp , 
    signIn  , 
    signOut ,
    checkAuth 
}