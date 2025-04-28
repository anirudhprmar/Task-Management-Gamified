import {axiosInstance} from '../api/axios.js';

export const allTodos = async (userData) => {
  const res = await axiosInstance.get('/todos/', userData);
  return res.data;
};

export const createTodo = async (userData) =>{
    const res = await axiosInstance.post('/todos/create',userData);
    return res.data
}

export const completeTodo = async(userData) =>{
    const res = await axiosInstance.put(`/todos/${userData}/completed`)
    return res.data
}

export const workingTodo = async(userData) =>{
    const res = await axiosInstance.put(`/todos/${userData}/working`)
    return res.data
}

export const deleteTodo = async(userData) =>{
    const res = await axiosInstance.delete(`/todos/${userData}/delete`)
    return res.data
}



