import React from 'react'
import { useAllTodos, useCompleteTodo,  } from '../../hooks/useTodos'
import { useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'

function CurrentTask() {

  const {data:todo,isLoading} = useAllTodos()
  const{mutate:completedThisWorkingTodo}=useCompleteTodo()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader2 className='size-3'/>
  }

  const handleCompleteTodo = (e)=>{
    e.preventDefault()
    completedThisWorkingTodo(currentTodo._id)
    navigate('/myDay')
  }

  const currentTodo = ()=>{
   return todo.filter(todo => todo.inPrgress === 'true')
  }

  return (
    <div>

      {currentTodo.length > 1 ?  
        <div>
          <h2>{currentTodo?.title}</h2>
          <p>{currentTodo?.note}</p>
          <p>{currentTodo?.inProgress}</p>
          <button onClick={handleCompleteTodo}>Completed</button>
        </div> 
        : "not working on any task"   
      }

     
      {/* 
      and and a ball or orb pulsating and when done click on completed btn and move to tasks of the day back
      */}
    </div>
  )
}

export default CurrentTask
