import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    User : null ,
    loading : false ,
    tasks : [] ,
    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

        userDetails:(state,action)=>{

            state.User = action.payload ;
        },
        SignOut:(state,action)=>{

            state.User = null 

        },
        allTasks : (state,action)=>{

            state.tasks = action.payload ;
        },
        deleteTask :(state,action)=>{

            state.tasks = state.tasks.filter((t)=> t._id !== action.payload) ;
        }
  },
})

export const { 

    userDetails,
    SignOut , 
    allTasks , 
    deleteTask
 } = userSlice.actions

export default userSlice.reducer