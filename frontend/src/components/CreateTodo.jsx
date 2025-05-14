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
      className=' grid grid-cols-1 justify-center items-center font-inter'
      >

        <div className=' flex flex-col gap-3 pb-5'>
          <label htmlFor="title" className='font-bold text-lg md:text-xl lg-text-2xl'>Title</label>
          <input type="text" {...register("title",{required:"Title is required"})}  placeholder='Go to gym' className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent 
                transition-all duration-300 hover:border-green-200'
          />
        </div>

        <div className='flex flex-col gap-3 pb-5'>
          <label htmlFor="note" className='font-bold text-lg md:text-xl lg-text-2xl'>Note</label>
          <input type="text" {...register("note")} placeholder='hit legs , 10 reps' className='text-xl px-4 py-2 rounded-lg border border-gray-300 bg-white/5 
                focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent 
                transition-all duration-300 hover:border-green-200'
          />   
        </div>
        

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

        <div className='flex gap-6 pb-5'>
          <label htmlFor="status" className='font-bold text-lg md:text-xl lg-text-2xl '>Work on it</label>
          <label className='text-lg md:text-xl lg:text-2xl font-bold flex gap-2'>
            <input  type="radio" value={false} {...register("inProgress")} />
            No
          </label>

          <label className='text-lg md:text-xl lg:text-2xl font-bold flex gap-2'>
            <input  type="radio" value={true} {...register("inProgress")} />
            Yes
          </label>

        </div>


          <button type='submit' disabled={isLoading}
          className='p-2 bg-green-500 rounded-xl text-xl'
          >
            {isLoading ? <Loader2 className="animate-spin size-2" /> : "Add a todo"}
          </button>

      </form>
    </div>
  )
}

export default CreateTodo
