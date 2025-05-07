import { useSignup } from '../../hooks/useSignup';
import {MoveRight, LoaderCircle} from 'lucide-react'
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Signup() {
  const {mutate: signup , isLoading, error} = useSignup()

  const {register, handleSubmit } = useForm()


  const onSubmit = (data) => {
    signup(data,{
      onSuccess:()=>{
        Navigate('/myDay')
      }
    });
  };

  if(error){
    toast.error("Error",error)
  }

 

  return (
   <main>
    {/* <section>
    Start Organizing Your Life Today
    </section> */}
    <section>
      <h1>Ready to Get Shit done ?</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="John Doe"
          {...register("name")}
        />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
        
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="*******
          "
          {...register("password")}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ?  <LoaderCircle size={4} className=' animate-spin'/> : <div>
            <span>Sign up <MoveRight/> </span>
          </div>}
        </button>

        {error && <p className='text-red-800'>{error.message}</p>}

        <div>
          <p>Already have an account?</p>
          <Link to={'/login'}>Login Here</Link>
        </div>
      </form>
    </section>
   </main>
  )
}

export default Signup
