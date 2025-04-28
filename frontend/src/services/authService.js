import {axiosInstance} from '../api/axios';

export const loginUser = async (userData) => {
  const res = await axiosInstance.post('/auth/login', userData);
  return res.data;
};

export const signupUser = async (userData) => {
  const res = await axiosInstance.post('/auth/signup', userData);
  return res.data;
};

export const logoutUser = async (userData) => {
  const res = await axiosInstance.post('/auth/logout', userData);
  return res.data;
};

export const updateUserProfile = async (userData)=>{
  const res = await axiosInstance.put('/auth/updateProfile',userData);
  return res.data
}

export const checkUserAuth = async (userData)=>{
  const res = await axiosInstance.get('/auth/check',userData);
  return res.data
}

export const deleteUser = async (userData)=>{
  const res = await axiosInstance.delete('/auth/deleteProfile',userData);
  return res.data
}


