import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import {LoaderCircle} from 'lucide-react'
import { Navigate } from 'react-router-dom';


function Login() {
  const { mutate: login, isLoading, error } = useLogin();

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData,{
      onSuccess:()=>{
        Navigate('/myDay')
      }
    });
  };

  const handleChange = () =>{
    setFormData(prev => ({
      ...prev
    }))
  }



  return (
   <main>
     {/* <section>
    Start Organizing Your Life Today
    </section> */}

    <section>
      <h1>Get back to getting shit done</h1>
      <form onSubmit={handleSubmit}>

      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="email"
        placeholder="johndoe@gmail.com"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        placeholder="*******
        "
        value={formData.password}
        onChange={handleChange}
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

export default Login

