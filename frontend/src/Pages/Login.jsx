import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { userDetails } from '../Redux Toolkit/User/userSlice';
import {toast} from 'react-toastify'

const Login = () => {

   const {User} = useSelector((state)=>state?.user) ;
   const navigate = useNavigate() ;

   useEffect(() => {
     if (User) {
    navigate('/')
    }
    
  }, []); 
 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  

  const dispatch = useDispatch() ;
    const [loading,setLoading] = useState(false) ;

  const onSubmit = async(data) => {
    const { email , password } = data 

    

    try {

      setLoading(true) 
      const response = await axios.post(import.meta.env.VITE_API_URL+'/auth/signin',{email,password},{ withCredentials: true})
    
    
    if(response.data.success){

      toast.success(response.data.message)
      setLoading(false) ;
      navigate('/dashboard/manage/all-task')
      dispatch(userDetails(response.data.User))
      return 
    }
      
    } catch (error) {
      setLoading(false)
     toast.error(error?.response.data.message)

     
      return 
    }

    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login to Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
         

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>

          <div>
            <p>Don't hava an acount ? <Link to={'/signup'} className='underline hover:text-blue-600'>Sign Up</Link></p>
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded
            cursor-pointer  hover:bg-blue-700 transition"
          disabled={loading}>
            {loading ? <p>Loading .....</p> :'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
