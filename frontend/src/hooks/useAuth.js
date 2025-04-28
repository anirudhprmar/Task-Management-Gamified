import { useQuery, useMutation } from "@tanstack/react-query";

import { checkUserAuth,deleteUser,loginUser,logoutUser,signupUser} from "../services/authService";

// also check the model for each like what is needed to make the api call , refer controller/ routes to understand what is needed

//check auth
export const useCheckAuth = ()=>{
   return useQuery({
    queryKey:['checkAuth'],
    queryFn:checkUserAuth
   })
}

//login
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

//signup
export const useSignup = ()=>{
    return useMutation({
        mutationFn:signupUser
    })
}

//logout 
export const useLogout = ()=>{
  return useMutation({
    mutationFn:logoutUser
  })
}

//delete User 

export const useDelete = ()=>{
  return useMutation({
    mutationFn:deleteUser
  })
}