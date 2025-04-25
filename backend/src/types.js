import {z} from 'zod'

export const createTodo = z.object({
    title: z.string().min(1, "Title is required"),
    note: z.string().min(1, "Note is required"),
    category: z.string().min(1, "Category is required"),
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


