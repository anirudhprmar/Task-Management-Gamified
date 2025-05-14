import { LoaderCircle, PencilIcon } from 'lucide-react'
import CreateTodo from '../../components/CreateTodo'
import Todo from '../../components/Todo'
import Modal from '../../components/ui/Modal'
import { useAllTodos } from '../../hooks/useTodos'
import toast from 'react-hot-toast'

function TodaysTasks() {

  const {data:allUserTodos , isLoading, error} = useAllTodos()

  if(error){
    toast.error("Error",error)
  }

  if(isLoading){
    return ( <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className="size-10 animate-spin" />
    </div>)
  }
  
  // i WANT THAT WHEN A USER CREATES A NEW TODO , A REQ SHOULD HIT THE BACKEND REQUESTING NEW TODOS WHICH CAN GET RENDERED IMMEDIATELY AFTER CREATING AND THE USER IS ABLE TO SEE THE TODO HE CREATED
  // HOW TO DO THAT ?????
  // 

  const allTodos = allUserTodos.todos

  return (

    <main className=' mx-auto py-5'>
      <section>
        <div className='grid grid-cols-1 px-8 lg:grid-cols-3 lg:gap-5'> 
          { allTodos.length < 1 ? "no todos by user at the moment" : allTodos.map((todo)=>{
            return <Todo key={todo._id} id={todo._id} title={todo.title} note={todo.note} completed={todo.completed} dueDate={todo.dueDate} inProgress={todo.inProgress}  />
          })}
          
        </div>

        <div className='absolute right-2 bottom-20'>
          <Modal openMsg={<PencilIcon className='text-gray-900'/>} children={<CreateTodo/>} />     
        </div>
      </section>     

    </main>
  )
}

export default TodaysTasks
