import { useSignup } from '../../hooks/useAuth';
import {MoveRight, LoaderCircle} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Signup() {
  const {mutate: signup , isLoading, error} = useSignup()

  const {register, handleSubmit } = useForm()

  const navigate = useNavigate()


  const onSubmit = (data) => {
    signup(data,{
      onSuccess:()=>{
        navigate('/myDay')
      }
    });
  };

  if(error){
    toast.error("Error",error)
  }

 // eye for password

  return (
   <main className='min-h-screen bg-gray-50 text-gray-950 grid lg:grid-cols-2 mx-auto  container min-w-full grid-cols-1'>

    <section className='hidden xl:block bg-[#0e1919] text-white'>
      <div className='text-left py-20 px-4'>
        <span className='text-7xl font-bold font-inter xl:text-9xl'>  Start Organizing Your Life Today</span>
      </div>
    </section> 

    <section className='py-10'>
      <div className='flex flex-col items-center'>
        <div className='text-center py-20 px-5'>
          <h1 className='font-inter font-bold text-2xl md:text-5xl xl:text-6xl'>Ready to Get Shit done ?</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col px-10 gap-3'
          >
            <div className='flex flex-col gap-1 xl:w-xl'>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="John Doe"
                {...register("username")}
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#0A3E3E] focus:border-transparent 
                transition-all duration-300 hover:border-[#0A3E3E]'
              />
            </div>

            <div className='flex flex-col gap-1 xl:w-xl'>
              <label htmlFor="email">Email</label>
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

            <div className='flex flex-col gap-1 xl:w-xl'> 
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="*******
                "
                className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-[#0A3E3E] focus:border-transparent 
                transition-all duration-300 hover:border-[#0A3E3E]'
                {...register("password")}
              />
            </div>


            <button type="submit" disabled={isLoading}>
              {isLoading ?  <LoaderCircle size={4} className=' animate-spin'/> : <div className='w-full bg-[#0A3E3E] rounded-xl py-2 mt-3 xl:w-xl cursor-pointer'>
                <span className='flex gap-3 text-2xl items-center justify-center text-white '>Sign up <MoveRight/> </span>
              </div>}
            </button>

            <div className='flex gap-2 justify-between xl:w-xl'>
              <p>Already have an account?</p>
              <Link to={'/login'} className='text-[#0D7B7B]'>Login Here</Link>
            </div>
          </form>
        </div>
      </div>

    </section>
   </main>
  )
}

export default Signup
