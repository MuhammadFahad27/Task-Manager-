import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { allTasks, deleteTask, SignOut } from '../Redux Toolkit/User/userSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + '/user/read-task',
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(allTasks(response.data.allTask));
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + '/auth/signout',
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(SignOut());
        navigate('/');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {

     
      const response = await axios.delete(import.meta.env.VITE_API_URL + '/user/delete-task',{
        data:{id},
        withCredentials:true 
      }); 

        


      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(deleteTask(id));
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="flex justify-between items-center flex-wrap px-4 py-3 bg-white shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Task Dashboard</h2>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total Tasks: {tasks.length}</span>
          <Link
            to="/create-task"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded hover:bg-blue-700 transition"
          >
            <FaPlus className="text-sm md:text-base" />
            <span>Create Task</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded hover:bg-red-700 transition"
          >
            <span>Log Out</span>
          </button>
        </div>
      </div>

     
      <div className="px-6 py-10">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center">
            <h3 className="text-xl md:text-2xl text-gray-700 font-semibold">
              No tasks found.
            </h3>
            <p className="text-gray-500 mt-2">
              Start by clicking the "Create Task" button above.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white shadow-md p-4 rounded border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  <p className="text-sm text-blue-600">
                    Status: <span className={`${task.status === 'cancelled' && 'text-red-500 '}
                    ${task.status === 'completed' && 'text-green-600'}
                    ${task.status === 'pending' && 'text-blue-500'}`}>{task.status}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <Link
                    to={`/update-task/${task._id}`}
                    className="text-green-600 hover:text-green-800 transition"
                    title="Edit Task"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
