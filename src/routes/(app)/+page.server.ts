import { redirect } from "@sveltejs/kit"

export async function load(event) {
  const { session } = await event.locals.safeGetSession()
  const { data: todoData, error: todoError } = await event.locals.supabase.from("todos").select()

  if (!session) {
    redirect(302, "/login")
  }

  return { todos: todoData }
}
