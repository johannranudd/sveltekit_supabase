<script lang="ts">
  import { page } from "$app/stores"
  import supabase from "../../../../config/supabaseClient"
  import type { Todo } from "../../../../types/todos"

  let todoId = ""
  let singleTodo: Todo | null = null

  $: todoId = $page.params.todoId
  $: if (todoId) {
    updateTodo()
  }

  async function updateTodo() {
    const { data, error } = await supabase.from("todos").select("*").eq("id", todoId).single() // Use .single() if you're expecting only one record to match the query

    console.log({ data, error })

    if (error) {
      console.error("Error fetching todo:", error)
      return
    }

    singleTodo = data
    console.log(data)
    console.log(singleTodo)
  }
</script>

<h1>Details</h1>
<h1>Todo ID: {todoId}</h1>
{#if singleTodo}
  <p>{singleTodo.id}</p>
  <p>{singleTodo.created_at}</p>
  <p>{singleTodo.title}</p>
  <p>{singleTodo.completed}</p>
  <p>{singleTodo.description}</p>
{/if}
