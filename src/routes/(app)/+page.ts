import supabase from "~/config/supabaseClient"

export async function load() {
  const { data, error } = await supabase.from("todos").select()

  return { todos: data, error }
}
