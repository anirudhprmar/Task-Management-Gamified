import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../services/authService";

export const useUpdateProfile = () =>{
    return useMutation({
        mutationFn:updateUserProfile
    })
}