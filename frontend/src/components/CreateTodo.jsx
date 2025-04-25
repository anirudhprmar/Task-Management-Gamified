import{ useState } from 'react'

function CreateTodo() {
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  

  return (
    <div>
        <div className='flex flex-col w-fit border-black'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className='bg-gray-600 border-neutral-50 text-gray-100' placeholder='Go to gym' 
            onChange={(e)=>setTitle(e.target.value)}
            />
        </div>

        <div className='flex flex-col w-fit '>
            <label htmlFor="title">Description</label>
            <input type="text" name="title" className='bg-gray-600 border-neutral-50 text-gray-100' placeholder='hit legs , 10 reps'
            onChange={(e)=>setDesc(e.target.value)}
            />   
        </div>

      <button
      onClick={async()=>{
        const res = await fetch('http://localhost:5001/todo',{
          method:'POST',
          body:JSON.stringify({
            title:title,
            description:desc
          }),
          headers:{
            "content-Type":"application/json"
          }
        })

        await res.json()

       alert('todo added')
      
      }}
      >Add a todo</button>
    </div>
  )
}

export default CreateTodo
