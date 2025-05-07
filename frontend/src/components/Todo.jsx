import React from 'react'
import { useCompleteTodo, useCurrentTodo, useDeleteTodo } from '../hooks/useTodos'
import {useNavigate} from 'react-router'
import toast from 'react-hot-toast';

function Todo({title,note,completed,dueDate, inProgress,category,id}) {
  const {mutate:deleteThisTodo,isLoading} =useDeleteTodo();
  const {mutate:todoCompleted} = useCompleteTodo()
  const {mutate:workingOnThisTodo} = useCurrentTodo()

  const navigate = useNavigate()

  const handleTodoDelete = ()=>{
    deleteThisTodo(id,{
      onSuccess:()=>{
        toast.success("Todo deleted")
      }
    })
  }

  if (isLoading) {
   return <div>deleting....</div>
  }

  return (
    <div>
      <h2 className={completed === true ? 'line-through' : ""}>{title}</h2>
      <p>{note}</p>
      <div>
        <button
        onClick={()=>{
          todoCompleted(id)
        }}
        >Completed:{completed == true ? 'Accomplished' : 'Not completed yet'}</button>

        <p>Due Date {dueDate}</p>
      </div>

      {/* handle completed, on current task page also */}
      
      <button
      onClick={()=>{
        workingOnThisTodo(id)
        navigate('/onGoing')
      }}
      >{!inProgress ? "Work on it" : "Work in progress"}</button>
      <p>{category}</p>

      <div>
        <button
        onClick={handleTodoDelete}
        >Delete</button>
      </div>
    </div>
  )
}

export default Todo
