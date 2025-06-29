const { handleError } = require("./error");
const jwt = require('jsonwebtoken')

const userAuthentication = async(req,res,next)=>{

    try {

         const token = req.cookies.task_token ;

        if(!token){

         return handleError(401,'Not Authenticated')
    }

        const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY) ;
        req.user  = verify ;
        next()

      
        
    } catch (error) {

       next(handleError(403,'Forbidden '))
        
    }
}

module.exports = {userAuthentication}