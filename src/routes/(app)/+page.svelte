<script lang="ts">
  import type { Todo, Todos } from "~/types/todos"
  import supabase from "~/config/supabaseClient"

  export let data: Todos
  let { todos, error } = data
  $: todos = data.todos.sort((a: Todo, b: Todo) => a.id - b.id)

  let newTitle = ""
  let newDesc = ""
  let editFlag = false
  let editObject: Todo | null = null

  async function addTodo(req: { title: string; description: string }) {
    const { data, error } = await supabase.from("todos").insert([req]).select()

    if (error) {
      console.error(error)
      return
    }
    if (data && data.length > 0) {
      todos = [...todos, data[0]]
    }
    reset()
  }

  async function handleSubmit() {
    if (!newTitle || !newDesc) {
      console.log("error")
      return
    }
    if (editFlag) {
      handleEdit(editObject)
    } else {
      addTodo({ title: newTitle, description: newDesc })
    }
    reset()
  }

  function stageEdit(id: number) {
    const matchingTodo = todos.find((todo) => todo.id === id)
    if (matchingTodo) {
      newTitle = matchingTodo.title
      newDesc = matchingTodo.description
      editFlag = true
      editObject = matchingTodo
    } else {
      editFlag = false
      editObject = null
    }
  }
  async function handleEdit(editObject: Todo | null) {
    if (editObject) {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: newTitle, description: newDesc })
        .eq("id", editObject.id)
        .select()

      if (error) {
        console.error(error)
        return
      }

      if (data && data.length > 0) {
        todos = todos.map((todo) => {
          if (todo.id === data[0].id) {
            return data[0]
          }
          return todo
        })
      }
    }
  }

  async function handleDelete(id: number) {
    const { data, error } = await supabase.from("todos").delete().eq("id", id).select()

    if (error) {
      console.error(error)
      return
    }

    console.log(data[0])

    if (data && data.length > 0) {
      console.log(data[0].id)
      todos = todos.filter((todo) => todo.id !== data[0].id)
    }
  }

  function reset() {
    editFlag = false
    editObject = null
    newTitle = ""
    newDesc = ""
  }
</script>

<h1 class="my-4 font-bold">Todos</h1>
<form on:submit|preventDefault={handleSubmit} class="flex gap-4 my-4">
  <div>
    <label for="newTitle">Title</label>
    <input id="newTitle" type="text" bind:value={newTitle} class="p-2 border" />
  </div>
  <div>
    <label for="newDesc">Description</label>
    <input id="newDesc" type="text" bind:value={newDesc} class="p-2 border" />
  </div>
  <button type="submit" class="p-2 bg-green-500">{editFlag ? "Edit" : "Submit"}</button>
  <button on:click={reset} type="button" class="p-2 border">Cancel</button>
</form>
{#if error}
  <p>An error occured fetching data</p>
{:else}
  <ul class="max-w-[700px]">
    {#each todos as todo}
      <li class="flex justify-between gap-4 mb-2">
        <a href="/details/{todo.id}" class="flex justify-between flex-1">
          <span>{todo.title}</span>
          <span>{todo.description}</span>
        </a>
        <div>
          <button on:click={() => stageEdit(todo.id)} class="bg-green-500 hover:opacity-70">Edit</button>
          <button on:click={() => handleDelete(todo.id)} class="bg-red-500 hover:opacity-70">Delete</button>
        </div>
      </li>
    {/each}
  </ul>
{/if}
