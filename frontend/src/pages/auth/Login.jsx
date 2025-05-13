import { useLogin } from '../../hooks/useAuth';
import {EyeOff, LoaderCircle,MoveRight,Eye} from 'lucide-react'
import { Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast';
import { useState } from 'react';


function Login() {
  const { mutate: login, isLoading, error } = useLogin()

  const { register, handleSubmit } = useForm();

  const [isPasswordVisible,setIsPasswordVisible] = useState(false)

  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data,{
      onSuccess:()=>{
        navigate('/myDay')
      }
    })
  }

  if (error) {
    toast.error("Error",error)
  }

  return (
   <main className='min-h-screen bg-gray-50 text-gray-950 grid xl:grid-cols-2 mx-auto  container min-w-full grid-cols-1'>
     <section className='hidden xl:block bg-[#0e1919] text-white'>
      <div className='text-left py-20 px-4'>
        <span className='font-bold font-inter xl:text-8xl'>Little wins add up. Don’t lose track of your journey.</span>
      </div>
    
    </section>

    <section className='py-10'>
      <div className='flex flex-col items-center'>

        <div className='text-center py-20 px-5'>
          <h1 className='font-inter font-bold text-2xl lg:text-5xl xl:text-6xl'>Get back to getting shit done</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col px-10 gap-3 '
          >
            <div className='flex flex-col  gap-1 xl:w-xl'>
              <label htmlFor="email" className='text-2xl'>Email</label>
              <input
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                {...register("email")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#0A3E3E] focus:border-transparent 
                transition-all duration-300 hover:border-[#0A3E3E]'
              />
            </div>

            <div className='flex flex-col gap-1 xl:w-xl relative'>
              <label htmlFor="password" className='text-2xl'>Password</label>
              <input
                name="password"
                type={ isPasswordVisible ? "text" : "password"}
                placeholder="*******
                "
                {...register("password")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#0A3E3E] focus:border-transparent 
                transition-all duration-300 hover:border-[#0A3E3E]'
              />
              <button
              className=' absolute right-4 top-[60%]  cursor-pointer'
              onClick={()=> setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff/> : <Eye/>}
              </button>
            </div>


      <button type="submit" disabled={isLoading}>
        {isLoading ?  <LoaderCircle size={4} className=' animate-spin'/> : <div className='w-full bg-[#0A3E3E] rounded-xl py-2 mt-3 xl:w-xl cursor-pointer'>
          <span className='flex gap-3 text-2xl items-center justify-center text-white '>Login <MoveRight/> </span>
        </div>}
      </button>

            <div className='flex gap-2 justify-between xl:w-xl'>
              <p>Don't have an account?</p>
                  
              <Link to={'/signup'} className='text-[#0D7B7B]'>Signup Here</Link> 
            </div>
        
          </form>
        </div>

      </div>

    </section>

   </main>
  )
}

export default Login

