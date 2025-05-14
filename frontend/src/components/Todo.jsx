import React, { useState } from 'react'
import { useCompleteTodo, useCurrentTodo, useDeleteTodo } from '../hooks/useTodos'
import {useNavigate} from 'react-router'
import toast from 'react-hot-toast';

function Todo({title,note,completed,dueDate, inProgress,id}) {
  const {mutate:deleteThisTodo,isLoading} =useDeleteTodo();
  const {mutate:todoCompleted} = useCompleteTodo()
  const {mutate:workingOnThisTodo} = useCurrentTodo()

  const [working,setWorking] = useState(false)

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

            //TODO COMPLETED -> A CHECK BOX FOR THE TODO 
            //IN PROGRESS ->  A GREEN DOT PULSATING SAYING WOKRING AND IF NOT A RED DOT PENDING

  return (
    

      <div className=' py-4 '>
        <div className='bg-green-100 text-gray-800 p-2 rounded-xl flex flex-col '>

          <label className='flex items-center'>
            <input type="checkbox" onClick={()=>{
              todoCompleted(id)
            }} className='size-4'/>

            <span className={completed === true ? 'line-through ' : "text-2xl px-2 font-bold font-italiana"}>{title}</span>

          </label>

          <p className='text-left px-6 font-inter'>{note}</p>
          <p>{dueDate ? `Due Date: ${dueDate}` : ''}</p>

          <button
          onClick={()=>{
            setWorking(!working)
            workingOnThisTodo(id)
            navigate('/onGoing')
            }}
            className=' cursor-pointer py-1 pb-2 text-left font-inter'
            >{working === false ? "Work on it" : ""}
            <div>
            {inProgress ? "blink green dot ":" red dot"}
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
