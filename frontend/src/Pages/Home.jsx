import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import axios, {Axios} from 'axios'

const Home = () => {

    const navigate = useNavigate() ;
    const [loading,setLoading] = useState(false) ;

    const handleAuth = async()=>{

        try {


          setLoading(true) ;
          console.log(import.meta.env.VITE_API_URL)

          const response = await axios.post(import.meta.env.VITE_API_URL+"/auth/check-authentication",{}, {
            withCredentials: true
          });

          if(response.data.success===false){
            setLoading(false)
             navigate('/login')
            return 
          }
          
          setLoading(false) 
          navigate('/dashboard/manage/all-task') ;
          return 
         
          
        } catch (error) {

          setLoading(false)
          return navigate('/')
          
        }

        

      
    }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-600"> Task Manager</h1>
        <nav className="space-x-6">
          <Link to="#about" className="text-gray-700 hover:text-blue-600">About</Link>
          <a href="mailto:muhammadfahadkamboh3@gmail.com" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
      </header>

     
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Manage Your Tasks Effortlessly
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mb-8">
          Stay organized, stay productive. Create, track and manage your daily tasks in one place.
        </p>
        <button   className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition cursor-pointer"
        onClick={handleAuth}
        disabled={loading}>
          
          {loading ? <p>Loading....</p> : <> Get Started
          <FaArrowRight className="ml-3" /></>}
           
        </button>
       
      </main>

     
      <footer className="bg-gray-100 text-center py-6" id="about">
        <p className="text-sm text-gray-600">
          Developed by Fahad Kamboh 
        </p>
      </footer>
    </div>
  );
};

export default Home;
