import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch() ;

  const onSubmit = async (data) => {

      const {title , description , dueDate} = data

      console.log(data)

      try {

        const response = await axios.post(import.meta.env.VITE_API_URL+'/user/create-task',{

          title , 
          description , 
          dueDate
        },{

          withCredentials:true
        })

        if(response.data.success){

          toast.success(response.data.message) ;
         
          navigate('/dashboard/manage/all-task')
          

          return ;
        }
        
      } catch (error) {
        toast.error('Some thing went Wrong')
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Let's Create Your Task</h1>
          <p className="text-sm text-gray-500">Write something meaningful to track</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">Task title is required</p>
            )}
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe your task"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">Description is required</p>
            )}
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
            <input
              type="date"
              {...register("dueDate", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500 mt-1">Due date is required</p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Loading...' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
