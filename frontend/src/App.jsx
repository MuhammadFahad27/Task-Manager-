import React from 'react'
import { Route , Routes } from 'react-router-dom'

import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import CreateTask from './Pages/CreateTask'
import EditTask from './Pages/EditTask'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './Components/ProtectedRoutes'


const App = () => {
  return (
    
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>

        <Route element={<ProtectedRoutes/>}>
           <Route path='/create-task' element={<CreateTask/>}/>
          <Route path='/update-task/:id' element={<EditTask/>}/>
            <Route path='/dashboard/manage/all-task' element={<Dashboard/>}/>
        </Route>
       
       

      </Routes>
       <ToastContainer theme="dark"/>
    </>
  )
}

export default App
