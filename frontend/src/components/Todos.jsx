import Todo from './Todo'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios'; // Your custom axios

function Todos() {

    const { data, isLoading, error } = useQuery({
      queryKey: ['todos'], // Unique name for this query
      queryFn: async () => {
        const response = await axiosInstance.get('/todos/');
        return response.data;
      },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;



  return (
    <div>
      {data && data.map(todo =>{
        return <Todo key={todo._id} title={todo.title} description={todo.description} completed={todo.completed}  />  
      })}
    </div>
  )
}

export default Todos
