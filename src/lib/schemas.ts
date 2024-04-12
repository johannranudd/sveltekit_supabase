import { z } from "zod"

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter a password"),
})

export const createTodoSchema = z.object({
  title: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
})
export const deleteTodoSchema = z.object({
  id: z.number().int(),
})
export const editTodoSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
})
