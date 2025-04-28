import { useQuery, useMutation } from "@tanstack/react-query";

import { allTodos, completeTodo, createTodo, deleteTodo, workingTodo} from "../services/todoService";

//get all todos of a user
export const useAllTodos = ()=>{
    return useQuery({
        queryKey:['allUserTodos'],
        queryFn:allTodos
    })
}

//create todo
export const useCreateTodo = ()=>{
    return useMutation({
        mutationFn:createTodo
    })
}

//complete todo
export const useCompleteTodo = ()=>{
    return useMutation({
        mutationFn:completeTodo
    })
}
//complete todo
export const useCurrentTodo = ()=>{
    return useMutation({
        mutationFn:workingTodo
    })
}
//complete todo
export const useDeleteTodo = ()=>{
    return useMutation({
        mutationFn:deleteTodo
    })
}