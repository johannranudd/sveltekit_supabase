import { redirect, type Actions } from "@sveltejs/kit"
import { fail, message, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { createTodoSchema, deleteTodoSchema, editTodoSchema } from "~/lib/schemas.js"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
  const { session } = await event.locals.safeGetSession()
  if (!session) {
    return redirect(302, "/login")
  }

  const { data: todoData, error: todoError } = await event.locals.supabase.from("todos").select()

  return {
    todos: todoData,
    createTodoForm: await superValidate(zod(createTodoSchema)),
    deleteTodoForm: await superValidate(zod(deleteTodoSchema)),
    editTodoForm: await superValidate(zod(editTodoSchema)),
  }
}

export const actions: Actions = {
  createTodo: async ({ request, locals }) => {
    const form = await superValidate(request, zod(createTodoSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { title, description } = form.data
    const { data: formData, error: formError } = await locals.supabase.from("todos").insert([{ title, description }])

    if (formError) {
      return message(form, "create item failed")
    }
    return message(form, "item created successfully!")
  },

  deleteTodo: async ({ request, locals }) => {
    const form = await superValidate(request, zod(deleteTodoSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { id } = form.data
    const { error: formError } = await locals.supabase.from("todos").delete().eq("id", id)

    if (formError) {
      return message(form, "delete item failed")
    }
    return message(form, "item deleted successfully!")
  },

  editTodo: async ({ request, locals }) => {
    const form = await superValidate(request, zod(editTodoSchema))
    if (!form.valid) {
      return fail(400, { form })
    }
    const { id, title, description } = form.data
    const { error: formError } = await locals.supabase.from("todos").update({ title, description }).eq("id", id)
    if (formError) {
      return message(form, "edited item failed")
    }
    return message(form, "item updated successfully!")
  },
}
