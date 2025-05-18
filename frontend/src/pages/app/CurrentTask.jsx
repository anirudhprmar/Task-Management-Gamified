import { useAllTodos, useCompleteTodo,  } from '../../hooks/useTodos'
import { useNavigate } from 'react-router'
import { LoaderCircle } from 'lucide-react'

function CurrentTask() {

  const {data:todo,isLoading} = useAllTodos()
  const{mutate:completedThisWorkingTodo}=useCompleteTodo()
  const navigate = useNavigate()

  if (isLoading) {
    return ( <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className="size-10 animate-spin" />
    </div>)
  }

  const handleCompleteTodo = (todoId)=>{
    completedThisWorkingTodo(todoId)
    navigate('/myDay')
  }


const TodoItems = todo.todos || [];
  

  const currentTodos = TodoItems.filter(todo => todo.inProgress === true)
  // if todo is completed then no need to enter current task , keep it empty 
  

  return (
   <div className='py-5 px-10'>
     {currentTodos ?  currentTodos.map(todo => (
      <div key={todo._id} className='py-7' >
        <div className=' border border-gray-50 w-fit p-3'>
          <h1 className='text-2xl font-italiana '>{todo.title}</h1>
          <p>{todo.note}</p>
          <button onClick={() => handleCompleteTodo(todo._id)} className='bg-green-300 font-bold rounded cursor-pointer p-1 text-xl text-gray-900 w-fit'>Completed ? </button> 
        </div>
      </div>
     )): (
        <div className='text-left text-2xl py-10 font-bold font-inter'>
          Not Working on any Task
        </div>
      )}
    </div>
  )
}

export default CurrentTask
