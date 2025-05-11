import { useLogin } from '../../hooks/useAuth';
import {LoaderCircle} from 'lucide-react'
import { Navigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast';


function Login() {
  const { mutate: login, isLoading, error } = useLogin()

  const { register, handleSubmit } = useForm();

  const navigate = Navigate();

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
   <main>
     {/* <section>
    Start Organizing Your Life Today
    </section> */}

    <section>
      <h1>Get back to getting shit done</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

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
          <span>Login <MoveRight/> </span>
        </div>}
      </button>

      {error && <p className='text-red-800'>{error.message}</p>}

        <div>
          <p>Don't have an account?</p>
               
          <a onClick={()=>{
            navigate('/signup')
          }}>Signup Here</a> //navigate
        </div>
      </form>
    </section>

   </main>
  )
}

export default Login

