<script lang="ts">
  import type { Todos } from "../../types/todos"
  import supabase from "../../config/supabaseClient"

  export let data: Todos
  let { todos, error } = data

  let newTitle = ""
  let newDesc = ""

  async function addTodo(req: { title: string; description: string }) {
    const { data, error } = await supabase.from("todos").insert([req]).select()

    if (error) {
      console.error(error)
      return
    }
    if (data && data.length > 0) {
      todos = [...todos, data[0]]
    }
    newTitle = ""
    newDesc = ""
  }

  async function handleSubmit() {
    if (!newTitle && !newDesc) {
      console.log("error")
      return
    }
    addTodo({ title: newTitle, description: newDesc })
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
  <button type="submit" class="p-2 bg-green-500">Submit</button>
</form>
{#if error}
  <p>An error occured fetching data</p>
{:else}
  <ul class="max-w-[400px]">
    {#each todos as todo}
      <li>
        <a href="/details/{todo.id}" class="flex justify-between">
          <span>{todo.title}</span>
          <span>{todo.description}</span>
        </a>
      </li>
    {/each}
  </ul>
{/if}
