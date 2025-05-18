import { useState } from "react"
import { useCheckAuth, useDelete } from "../../hooks/useAuth"
import { useUpdateProfile } from "../../hooks/useProfile"
import {Camera, X, Check} from 'lucide-react'
import {toast} from 'react-hot-toast'
import { useForm } from "react-hook-form"
import Modal from "../../components/ui/Modal"
import {Link} from 'react-router'



function Profile() {
const {data: checkAuth} = useCheckAuth()
const { mutate: updateProfile, isLoading:isUpdateProfileLoading}= useUpdateProfile()
const {mutate:deleteProfile} = useDelete()

const { register, handleSubmit, setValue } = useForm();

const [updateForm,setUpdateForm] = useState(false)

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

 


 const handleDeleteProfile = ()=>{
  deleteProfile(checkAuth._id)
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

const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <div className={updateForm ? 'hidden' : 'flex justify-center flex-row items-center py-10 '}>
      <div>
        {!checkAuth?.profilePic ? <div className="size-32 rounded-full border-4 relative" >
         <span className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{checkAuth?.username[0]}</span> 
        </div> :  <img
          src={checkAuth?.profilePic }
          alt="profile"
          className="size-32 rounded-full object-cover border-4 "
          />
   }
       
        <p className=" py-3 font-inter">{checkAuth?.bio}</p>
      </div>

      <div className="flex flex-col w-fit py-2 pb-5">
        <p className="px-4 py-2.5 text-2xl font-bold font-inter ">{checkAuth?.username}</p>
        <p className="px-4 py-2.5 text-lg  font-bold font-inter ">{checkAuth?.email}</p>
      </div>
     
      </div>

    {updateForm && <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center py-10 flex-col gap-3"
        >

       <div className="relative">

          {!checkAuth?.profilePic ? <div className="size-32 rounded-full border-4 relative" >
          <span className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{checkAuth?.username[0]}</span> 
          </div> :  <img
            src={checkAuth?.profilePic || selectedImg }
            alt="profile"
            className="size-32 rounded-full object-cover border-4 "
            />
          }
    
          <label htmlFor="avatar-upload"
            className={`
            absolute bottom-0 right-0 
            bg-base-content hover:scale-105
            p-2 rounded-full cursor-pointer 
            transition-all duration-200
            ${isUpdateProfileLoading ? "animate-pulse pointer-events-none" : ""}
            `}
          >
            <Camera className="w-5 h-5 text-gray-950" /> 

            <input 
            type="file" 
            className="hidden"
            id="avatar-upload"
            accept="image/*"
            {...register("profilePic")}
            onChange={()=>{
              // profilePicRegister.onChange();
              handleImageUpload();
              // profile pic is not working , sending {} due to this backend cloudinary error , not accepting obj
            }}
            disabled={isUpdateProfileLoading}
            /> 
        </label>

      </div>

      <div className="flex flex-col gap-1 xl:w-xl relative">
        <label htmlFor="bio" className="text-xl font-inter">Bio</label>
        <input type="text"  {...register("bio")} 
        className="text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent 
                transition-all duration-300 hover:border-gray-50 "
        />
      </div>

        <div className="flex flex-col gap-1 xl:w-xl relative">
        <label htmlFor="username" className="text-xl font-inter">Username</label>
        <input type="text" {...register("username")} 
         className="text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
        focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent 
        transition-all duration-300 hover:border-gray-50 "
        /> 
      </div>

        <div className="flex flex-col gap-1 xl:w-xl relative">
          <label htmlFor="email" className="text-xl font-inter">Email</label>      
          <input type="text" {...register("email")}
          className="text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
          focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent 
          transition-all duration-300 hover:border-gray-50 "
          /> 
        </div>

        <button type="submit" disabled={isUpdateProfileLoading}>
          {isUpdateProfileLoading ? <LoaderCircle size={4} className=' animate-spin'/> : <div className=" border border-green-100 cursor-pointer p-2  rounded-xl" >
          <Check/>
            </div>}
        </button>

        </form>
      </div>}


    <div className="flex py-3 justify-center gap-5 items-center">
        <button
          onClick={()=> setUpdateForm(!updateForm)}
          className=" border border-green-100 cursor-pointer p-2  rounded-xl"
          >
            
            {updateForm ? <X /> : `update profile`}
          </button>

          <div 
          className=" cursor-pointer p-2 text-gray-50 bg-red-700 rounded-xl"
          >
            
            {/* //fix this  */}
            {isOpen && <Modal openMsg={'delete profile'} children={<div>
              <span>Do you really want to delete this profile ?</span>
              <div className="flex gap-4">
                <Link
                onClick={()=> setIsOpen(!isOpen)}
                >No</Link>
                <Link
                onClick={handleDeleteProfile}
                >Yes</Link>
              </div>
            </div>}/>}
          
          </div>
    </div>


    </div>
  )
}

export default Profile
