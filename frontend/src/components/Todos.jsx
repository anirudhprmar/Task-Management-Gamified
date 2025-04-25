import React, { useEffect, useState } from 'react'
import Todo from './Todo'

function Todos() {
    const [todos,setTodos] = useState([])

    useEffect(()=>{
        async function gettingTodosFromBackend(){
            const res = await fetch('http://localhost:5001/todos')
            const data = await res.json()
            setTodos(data.todos)
        } 
        gettingTodosFromBackend()
    },[])

    if (todos.length < 1) {
        return (
            <div>
                <h1>NO TODOS</h1>
            </div>
        )
    }

  return (
    <div>
      {todos && todos.map(todo =>{
        return <Todo key={todo._id} title={todo.title} description={todo.description} completed={todo.completed}  />
      })}
    </div>
  )
}

export default Todos
