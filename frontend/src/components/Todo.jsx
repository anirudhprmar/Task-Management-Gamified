import React, { useState } from 'react'
import { useCompleteTodo, useCurrentTodo, useDeleteTodo } from '../hooks/useTodos'
import {useNavigate} from 'react-router'
import toast from 'react-hot-toast';

function Todo({title,note,dueDate,completed, inProgress,todoId}) {
  const {mutate:deleteThisTodo,isLoading} =useDeleteTodo();
  const {mutate:todoCompleted} = useCompleteTodo()
  const {mutate:workingOnThisTodo} = useCurrentTodo()

  const [working,setWorking] = useState(false)
  const [isChecked,setIsChecked] = useState(false)

  const navigate = useNavigate()

  const handleTodoDelete = ()=>{
    deleteThisTodo(todoId,{
      onSuccess:()=>{
        toast.success("Todo deleted")
      }
    })
  }

  if (isLoading) {
   return <div>deleting....</div>
  }


  return (
    

      <div className=' py-4 '>
        <div className='bg-green-100 text-gray-800 p-2 rounded-xl flex flex-col '>

          <label className='flex items-center'>
            <input type="checkbox" value={isChecked} onChange={()=>{
              setIsChecked(!isChecked)
              todoCompleted(todoId)
            }} className='size-4'/>

            <span className={isChecked || completed ? "line-through text-2xl px-2 font-bold font-italiana " : "text-2xl px-2 font-bold font-italiana"}>{title}</span>

          </label>

          <p className='text-left px-6 font-inter'>{note}</p>
          <p>{dueDate ? `Due Date: ${dueDate}` : ''}</p>

          <button
          onClick={()=>{
            setWorking(!working)
            workingOnThisTodo(todoId)
            navigate('/onGoing')
            }}
            className=' cursor-pointer py-1 pb-2 text-left font-inter'
            >{working ? <div>Working</div> : <div>Work on it</div>}
            <div>
            {inProgress ? 
              <span className='relative flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
              </span>:
              <span className='relative flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
              </span>
            }
            </div>
            </button>
        
            <button
            onClick={handleTodoDelete}
            className='bg-red-600 p-1 rounded-2xl text-lg cursor-pointer font-inter text-gray-50'
            >Delete</button>


        </div>      
      </div>
  )
}

export default Todo
