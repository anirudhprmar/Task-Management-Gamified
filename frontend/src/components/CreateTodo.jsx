import{ useState } from 'react'
import { useCreateTodo } from '../hooks/useTodos';
import { Loader2 } from 'lucide-react';
import {DateTimePicker} from 'react-datetime-picker'

function CreateTodo() {
  const {mutate:createUserTodo , isLoading} = useCreateTodo()

 const [formData,setFormData] = useState({
  title:"",
  note:"",
  completed:false,
  dueDate:"",
  inProgress:false,
  category:""
 })

 const handleSubmit =(e)=>{
  e.preventDefault();
  createUserTodo(formData,
    {
      onSuccess:()=>{
        alert("todo created")
        // toast -> todo created 
      }
    }
  )
}

  
 
  return (
    <form onSubmit={handleSubmit}>
        
            <label htmlFor="title">Title</label>
            <input type="text" name="title"  placeholder='Go to gym' 
            value={formData.title}
            onChange={(e)=>setFormData(e.target.value)}
            />
       
            <label htmlFor="title">Note</label>
            <input type="text" name="title" placeholder='hit legs , 10 reps'
            value={formData.note}
            onChange={(e)=>setFormData(e.target.value)}
            />   

            <label htmlFor="title">Completed:</label>
            <input type="checkbox" name="title" placeholder='hit legs , 10 reps'
            value={formData.completed}
            onChange={(e)=>setFormData(e.target.value)}
            />   

            <label htmlFor="title">Due Date</label>
            {/* <input type="text" name="title" placeholder='hit legs , 10 reps'
            value={formData.dueDate}
            onChange={(e)=>setFormData(e.target.value)}
            />    */}
            <DateTimePicker   value={formData.dueDate}
            onChange={(e)=>setFormData(e.target.value)}/>


            <label htmlFor="title">Status</label>
            <input type="text" name="title" placeholder='hit legs , 10 reps'
            value={formData.inProgress}
            onChange={(e)=>setFormData(e.target.value)}
            />   

            <label htmlFor="title">Category</label>
            <input type="text" name="title" placeholder='hit legs , 10 reps'
            value={formData.category}
            onChange={(e)=>setFormData(e.target.value)}
            />   
        

      <button type='submit' className={isLoading ? <Loader2 size={4}/> : ""}>Add a todo</button>
    </form>
  )
}

export default CreateTodo
