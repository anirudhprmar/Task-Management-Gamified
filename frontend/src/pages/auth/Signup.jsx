// import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
// import {LoaderCircle} from 'lucide-react'
// import { Navigate } from 'react-router-dom';

function Signup() {
  const {mutate: signup , isLoading, error} = useSignup()
  // const [username,setUsername] = useState('')
  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ username, email, password },{
      onSuccess:()=>{
        // Navigate('/')
      }
    });
  };

  if (isLoading) {
    return(
      <div>
        <LoaderCircle size={4} className=' animate-spin'/>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
}

export default Signup
