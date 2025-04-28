import {z} from 'zod'

export const createTodo = z.object({
    title: z.string().min(1, "Title is required"),
    note: z.string(),
    category: z.string(),
    dueDate: z.string().optional(),
    completed: z.boolean().default(false),
    inProgress: z.boolean().default(false)
})

export const ValidateIdToUpdate = z.object({
    id:z.string(),
    updates:z.object({
        completed:z.boolean(),
        inProgress:z.boolean()
    }).partial()
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