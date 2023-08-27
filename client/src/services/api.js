import axios from 'axios';
import {CREATETODO, DELETE_TODO, LOGIN, MARK_TODO, REGISTER, TODO_LIST, UPDATE_TODO} from "./apiConstants.js";

export const login=async (data)=>{
    return axios.post(LOGIN, data)
}

export const register=async (data)=>{
    return axios.post(REGISTER, data)
}

export const createTodoApi=async (data)=>{
    let token=getToken()
    console.log('token',token)
    return axios.post(CREATETODO, data,{
        headers:{
            auth:token
        }
    })
}

export const deleteTodoApi=async (data)=>{
    let token=getToken()
    console.log('token',token)
    return axios.post(DELETE_TODO, data,{
        headers:{
            auth:token
        }
    })
}

export const markTodoApi=async (data)=>{
    let token=getToken()
    console.log('token',token)
    return axios.post(MARK_TODO, data,{
        headers:{
            auth:token
        }
    })
}

export const getTodoListApi=async (data)=>{
    let token=getToken()
    console.log('token',token)
    return axios.get(TODO_LIST, {
        headers:{
            auth:token
        }
    })
}


export const updateTodoApi = async ({ todo_id, desc }) => {
    const token = getToken();
  
    try {
      const response = await axios.put(
        `${UPDATE_TODO}/${todo_id}`, // Use the correct URL with the todo_id parameter
        {
          desc,
        },
        {
          headers: {
            auth: token,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };


export function getToken(){
    let user=localStorage.getItem('user')
    if(!user){
        return
    }
    const userObj=JSON.parse(user);
    return userObj.token;
}

