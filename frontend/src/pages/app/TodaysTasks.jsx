import CreateTodo from '../../components/CreateTodo'
import Todo from '../../components/Todo'
import { useAllTodos } from '../../hooks/useTodos'

function TodaysTasks() {

  const {data:allUserTodos} = useAllTodos()

  

  return (
    <div>

      {allUserTodos && allUserTodos.map((todo)=>{
        return <Todo key={todo._id} id={todo._id} title={todo.title} note={todo.note} completed={todo.completed} dueDate={todo.dueDate} inProgress={todo.inProgress} category={todo.category} />
      })}

      <div>
          <CreateTodo/>
      </div>
      
    </div>
  )
}

export default TodaysTasks
