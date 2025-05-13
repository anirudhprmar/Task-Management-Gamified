import { LoaderCircleIcon, PencilIcon } from 'lucide-react'
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
    return (<div className='min-h-screen bg-[#000101]'>
      <LoaderCircleIcon className='size-4 animate-spin' />
    </div>)
  }

  const allTodos = allUserTodos.todos

  return (

    <main>
      <section>
        <div className=' '> 
          Todo's here
          {console.log(allUserTodos.todos)};
          
          { allTodos.length < 1 ? "no todos by user at the moment" : allTodos.map((todo)=>{
            return <Todo key={todo._id} id={todo._id} title={todo.title} note={todo.note} completed={todo.completed} dueDate={todo.dueDate} inProgress={todo.inProgress} category={todo.category} />
          })}
          
        </div>

        <div className='absolute right-10 top-10'>
          <Modal openMsg={<PencilIcon/>} children={<CreateTodo/>} />     
        </div>
      </section>     

    </main>
  )
}

export default TodaysTasks
