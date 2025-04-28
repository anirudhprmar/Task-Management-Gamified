import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import {LoaderCircle} from 'lucide-react'
import { Navigate } from 'react-router-dom';


function Login() {
  const { mutate: login, isLoading } = useLogin();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password },{

      onSuccess:()=>{
        Navigate('/')
      }
    });
  };

  if (isLoading) {
    return(
      <div>
        if (isLoading) {
          <LoaderCircle size={4} className=' animate-spin'/>
        }
      </div>
    )
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='johndoe69@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='....'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>submit</button>
          </form>
    </div>
  )
}

export default Login

