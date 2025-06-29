import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
import Login from '../Pages/Login';

function ProtectedRoutes() {

    const {User} = useSelector((state)=>state?.user) ;

    return User ?  <Outlet/> : <Navigate to={'/login'}/>
   
 
}

export default ProtectedRoutes


 