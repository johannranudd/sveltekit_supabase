import { redirect } from "@sveltejs/kit"

export async function load({ locals, params }) {
  const { session } = await locals.safeGetSession()
  if (!session) {
    redirect(302, "/login")
  }
  const { data: todoData, error: todoError } = await locals.supabase.from("todos").select().eq("id", params.todoId)

  return { todo: todoData }
}
