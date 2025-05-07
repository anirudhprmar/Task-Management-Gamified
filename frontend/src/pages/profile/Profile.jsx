import { useState } from "react"
import { useCheckAuth } from "../../hooks/useAuth"
import { useUpdateProfile } from "../../hooks/useProfile"
import {Camera, Dot} from 'lucide-react'
import {toast} from 'react-hot-toast'
import { useForm } from "react-hook-form"


function Profile() {
const {data: checkAuth} = useCheckAuth()
const { mutate: updateProfile, isLoading:isUpdateProfileLoading}= useUpdateProfile()

const { register, handleSubmit, setValue } = useForm();


const [selectedImg,setSelectedImg] =  useState(null)

const handleImageUpload = async (e)=>{  
  const file = e.target.files[0];
  if (!file) {
   return
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async ()=>{
   const base64Image = reader.result;
   setSelectedImg(base64Image)
   setValue("profilePic",base64Image)
  }

 }

 
 const onSubmit = (data)=>{
   updateProfile(data,
    {
      onSuccess:()=>{
        toast.success("Profile updated")
      }
    }
  )
  
}

const profilePicRegister = register("profilePic")

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <img
        src={checkAuth?.profilePic || selectedImg}
        alt="profile"
        className="size-32 rounded-full object-cover border-4 "
        />

        <label htmlFor="avatar-upload"
         className={`
          absolute bottom-0 right-0 
          bg-base-content hover:scale-105
          p-2 rounded-full cursor-pointer 
          transition-all duration-200
          ${isUpdateProfileLoading ? "animate-pulse pointer-events-none" : ""}
          `}
          />

        <Camera className="w-5 h-5 text-base-200" /> 

        <input 
        type="file" 
        className="hidden"
        id="avatar-upload"
        accept="image/*"
        {...profilePicRegister}
        onChange={(e)=>{
          profilePicRegister.onChange(e);
          handleImageUpload(e);
        }}
        disabled={isUpdateProfileLoading}
        /> 
    
        <p className="text-sm text-zinc-400">
          {isUpdateProfileLoading ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>


        <label htmlFor="username">Bio</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth?.bio}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" {...register("bio")}/> 
              {/* new value will be passed to the form for bio */}
            </div>
          )
        }}>Update bio</a>

        <label htmlFor="username">Username</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth?.username}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" {...register("username")} /> 
              {/* new value will be passed to the form for username */}
            </div>
          )
        }}>Update Username</a>

        <label htmlFor="username">Email</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth?.email}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" {...register("email")}/> 
              {/* new value will be passed to the form for email */}
            </div>
          )
        }}>Update email</a>

      </form>
    </div>
  )
}

export default Profile
