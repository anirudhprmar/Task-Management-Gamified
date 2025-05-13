import { useCreateTodo } from '../hooks/useTodos';
import { Loader2 } from 'lucide-react';
import {DateTimePicker} from 'react-datetime-picker'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
function CreateTodo() {
  const {mutate:createUserTodo , isLoading} = useCreateTodo()

  const { register, handleSubmit } = useForm();


 const onSubmit =(data,e)=>{
  createUserTodo(data,
    {
      onSuccess:()=>{
        toast.success("Todo Created")
      }
    }
  )

  e.target.reset()
}

  
 
  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}
      className=' grid grid-cols-1 justify-center items-center'
      >

        <div className=' flex flex-col'>
          <label htmlFor="title">Title:</label>
          <input type="text" {...register("title",{required:"Title is required"})}  placeholder='Go to gym' 
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="note">Note:</label>
          <input type="text" {...register("note")} placeholder='hit legs , 10 reps'
          />   
        </div>

        {/* <div>
          <label htmlFor="completed">Completed:</label>
          <input type="radio" value="yes" {...register("completed")}
          />   
        </div> */}
        

        {/* <div>
          <label htmlFor="dueDate">Due Date</label>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker {...field}   className={'w-full'} />
            )}
          />
        </div> */}

        <div className='flex gap-5'>
          <label htmlFor="status">Working on it :</label>
          <label>
            <input type="radio" value={false} {...register("inProgress")} />
            No
          </label>

          <label>
            <input type="radio" value={true} {...register("inProgress")} />
            Yes
          </label>

        </div>

        <div className='flex gap-4 pb-5'>
          <label htmlFor="category">Category</label>
          <input type="text"  placeholder='health,work ...'
          {...register("category")}
          />   
        </div>
        
          

              <button type='submit' disabled={isLoading}
              className='p-2 bg-green-500 rounded-xl text-xl'
              >
                {isLoading ? <Loader2 size={16} className="animate-spin inline" /> : "Add a todo"}
              </button>

      </form>
    </div>
  )
}

export default CreateTodo
