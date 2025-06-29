import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTask = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetch_Task = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/user/single-task/${id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          const task = response.data.task;

          setValue("title", task.title);
          setValue("description", task.description);
          setValue("dueDate", task.dueDate.slice(0, 10));
          setValue("status", task.status); // ✅ new line
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetch_Task();
  }, [dispatch, id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/user/update-task/${id}`,
        data, 
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/dashboard/manage/all-task');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Let's Update Your Task</h1>
          <p className="text-sm text-gray-500">Write something meaningful to Update Task</p>
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

        
          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              {...register("status", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Status --</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">Status is required</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Loading...' : 'Update Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
