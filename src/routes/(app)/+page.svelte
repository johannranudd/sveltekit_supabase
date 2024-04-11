<script lang="ts">
  import type { Todo, Todos } from "~/types/todos"
  import type { PageData } from "./$types"

  export let data: PageData
  let { todos, session, user } = data
  $: todos = todos ? todos.sort((a, b) => a.id - b.id) : todos

  let newTitle = ""
  let newDesc = ""
  let editFlag = false
  let editObject: Todo | null = null
</script>

<h1 class="my-4 font-bold">Todos</h1>
<form method="POST" action="/logout">
  <button type="submit">Logout</button>
</form>
<form class="flex gap-4 my-4">
  <div>
    <label for="newTitle">Title</label>
    <input id="newTitle" type="text" bind:value={newTitle} class="p-2 border" />
  </div>
  <div>
    <label for="newDesc">Description</label>
    <input id="newDesc" type="text" bind:value={newDesc} class="p-2 border" />
  </div>
  <button type="submit" class="p-2 bg-green-500">{editFlag ? "Edit" : "Submit"}</button>
  <button type="button" class="p-2 border">Cancel</button>
</form>
<ul class="max-w-[700px]">
  {#if todos && todos.length > 0}
    {#each todos as todo}
      <li class="flex justify-between gap-4 mb-2">
        <a href="/details/{todo.id}" class="flex justify-between flex-1">
          <span>{todo.title}</span>
          <span>{todo.description}</span>
        </a>
        <div>
          <button class="bg-green-500 hover:opacity-70">Edit</button>
          <button class="bg-red-500 hover:opacity-70">Delete</button>
        </div>
      </li>
    {/each}
  {/if}
</ul>
