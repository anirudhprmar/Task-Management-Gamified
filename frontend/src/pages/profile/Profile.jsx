import { useState } from "react"
import { useCheckAuth, useSignup } from "../../hooks/useAuth"
import { useUpdateProfile } from "../../hooks/useProfile"
import {Camera, Dot} from 'lucide-react'


function Profile() {
const {data: checkAuth} = useCheckAuth()
const { mutate: updateProfile, isLoading:isUpdateProfileLoading}= useUpdateProfile()

const {mutate:signup} = useSignup()

const [formData,setFormData] = useState({
  email:"",
  username:"",
  password:"",
  profilepic:"",
  bio:""
})
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
   setFormData({profilePic:base64Image})
  }

 }

//if password is changed than we need to call signup api which will hash the new password

const handleSubmit = (e)=>{
  e.preventDefault()
  updateProfile(formData,
  //   {
  //   onSuccess:()=>{
  //     // toast -> profile updated
      
  //   }
  // }
)
  signup({email:formData.email,password:formData.password,username:formData.username},{
    onSuccess:()=>{
      alert("Success profile updated");
    }
  })
}

const handleChange = (e)=>{
  setFormData((prev) => ({
    ...prev,
    [e.target.username]:e.target.value,
    [e.target.password]:e.target.value,
    [e.target.bio]:e.target.value,
    [e.target.email]:e.target.value
  }))
}

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <img
        src={checkAuth.data?.profilePic || selectedImg}
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
        onChange={handleImageUpload}
        disabled={isUpdateProfileLoading}
        /> 
    
        <p className="text-sm text-zinc-400">
          {isUpdateProfileLoading ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>


        <label htmlFor="username">Bio</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth.data?.bio}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" value={formData.bio} onChange={handleChange}/> 
              {/* new value will be passed to the form for bio */}
            </div>
          )
        }}>Update bio</a>

        <label htmlFor="username">Username</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth.data?.username}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" value={formData.username} onChange={handleChange}/> 
              {/* new value will be passed to the form for username */}
            </div>
          )
        }}>Update Username</a>

        <label htmlFor="username">Email</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{checkAuth.data?.email}</p>
        <a onClick={()=>{
          return (
            <div>
              <input type="text" value={formData.email} onChange={handleChange}/> 
              {/* new value will be passed to the form for email */}
            </div>
          )
        }}>Update email</a>

        <label htmlFor="username">Password</label>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border"><Dot/><Dot/><Dot/><Dot/><Dot/><Dot/></p>
        <a onClick={()=>{
          return (
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input type="text" value={formData.password} onChange={handleChange}/> 
              {/* new value will be passed to the form for password */}
            </div>
          )
        }}>Update password</a>


      </form>
    </div>
  )
}

export default Profile
