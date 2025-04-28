import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import {MoveRight, LoaderCircle} from 'lucide-react'
import { Navigate, Link } from 'react-router-dom';

function Signup() {
  const {mutate: signup , isLoading, error} = useSignup()

  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    setFormData((prev) => ({
      ...prev,
      [e.target.username]:e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData,{
      onSuccess:()=>{
        Navigate('/myDay')
      }
    });
  };

 

  return (
   <main>
    {/* <section>
    Start Organizing Your Life Today
    </section> */}
    <section>
      <h1>Ready to Get Shit done ?</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
        />

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

export default Signup
