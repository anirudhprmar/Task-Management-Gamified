import {z} from 'zod'

export const createTodo = z.object({
    title: z.string(),
    note: z.string(),
    category: z.string().optional(),
    // dueDate: z.string().optional(),
    completed: z.boolean().default(false), // this might cause an issue
    inProgress: z.string().default("false")
})




export const signupSchema = z.object({
    email:z.string().email(),
    username:z.string().min(1),
    password:z.string().min(6)
})

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})