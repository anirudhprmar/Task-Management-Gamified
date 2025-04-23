import React from 'react'

function CreateTodo() {


  return (
    <div>
        <div className='flex flex-col w-fit '>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className='bg-gray-600 border-neutral-50 text-gray-100' placeholder='Go to gym' />
        </div>

        <div className='flex flex-col w-fit '>
            <label htmlFor="title">Description</label>
            <input type="text" name="title" className='bg-gray-600 border-neutral-50 text-gray-100' placeholder='hit legs , 10 reps' />   
        </div>

      <button>Add a todo</button>
    </div>
  )
}

export default CreateTodo
