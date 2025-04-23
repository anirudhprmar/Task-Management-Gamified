import {z} from 'zod'

export const createTodo = z.object({
    title:z.string().min(1),
    description:z.string().min(1)
})

export const updateTodo = z.object({
    id:z.string()
})