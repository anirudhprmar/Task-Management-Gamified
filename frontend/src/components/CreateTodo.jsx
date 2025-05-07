import { useCreateTodo } from '../hooks/useTodos';
import { Loader2 } from 'lucide-react';
import {DateTimePicker} from 'react-datetime-picker'
import {useForm,Controller} from 'react-hook-form'
import {toast} from 'react-hot-toast'
function CreateTodo() {
  const {mutate:createUserTodo , isLoading} = useCreateTodo()

  const { register, handleSubmit, control } = useForm();


 const onSubmit =(data)=>{
  createUserTodo(data,
    {
      onSuccess:()=>{
        toast.success("Todo Created")
      }
    }
  )
}

  
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title",{required:"Title is required"})}  placeholder='Go to gym' 
          
            />
       
            <label htmlFor="note">Note</label>
            <input type="text" {...register("note")} placeholder='hit legs , 10 reps'
            />   

            <label htmlFor="completed">Completed:</label>
            <input type="radio" {...register("completed")}
            />   

            <label htmlFor="dueDate">Due Date</label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker {...field} />
              )}
            />


            <label htmlFor="status">Working on it :</label>
            <label>
              <input type="radio" value="No" {...register("inProgress")} />
              No
            </label>

           <label>
              <input type="radio" value="Yes" {...register("inProgress")} />
              Yes
            </label>


            <label htmlFor="category">Category</label>
            <input type="text"  placeholder='health,work ...'
            {...register("category")}
            />   
        

            <button type='submit'>
              {isLoading ? <Loader2 size={16} className="animate-spin inline" /> : "Add a todo"}
            </button>

    </form>
  )
}

export default CreateTodo
