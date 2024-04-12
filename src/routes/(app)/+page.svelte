<script lang="ts">
  import type { PageData } from "./$types"
  import { superForm } from "sveltekit-superforms"

  export let data: PageData
  const { form: createTodoForm, message: createMessage, enhance: createEnhance, errors: createErrors } = superForm(data.createTodoForm)
  const { form: deleteTodoForm, message: deleteMessage, enhance: deleteEnhance, errors: deleteErrors } = superForm(data.deleteTodoForm)
  const {
    form: editTodoForm,
    message: editMessage,
    enhance: editEnhance,
    errors: editErrors,
  } = superForm(data.editTodoForm, {
    onResult(event) {
      if (event.result.status === 200) {
        editFlag = false
      }
    },
  })

  $: todos = data.todos?.sort((a, b) => a.id - b.id)

  let editFlag = false

  function stageEdit(index: number) {
    editFlag = true
    if (todos) {
      $editTodoForm.id = todos[index].id
      $editTodoForm.title = todos[index].title
      $editTodoForm.description = todos[index].description
    }
  }
</script>

<h1 class="my-4 font-bold">Todos</h1>
{#if !editFlag}
  <form method="POST" use:createEnhance action="?/createTodo" class="flex gap-4 my-4">
    <div>
      <label for="newTitle">Title</label>
      <input id="newTitle" type="text" name="title" bind:value={$createTodoForm.title} class="p-2 border" />
    </div>
    <div>
      <label for="newDesc">Description</label>
      <input id="newDesc" type="text" name="description" bind:value={$createTodoForm.description} class="p-2 border" />
    </div>
    <button type="submit" class="p-2 bg-green-500">Submit</button>
    <button type="button" class="p-2 border">Cancel</button>
  </form>
{:else}
  <form method="POST" use:editEnhance action="?/editTodo" class="flex gap-4 my-4">
    <input type="hidden" bind:value={$editTodoForm.id} name="id" />
    <div>
      <label for="newTitle">Title</label>
      <input id="newTitle" type="text" name="title" bind:value={$editTodoForm.title} class="p-2 border" />
    </div>
    <div>
      <label for="newDesc">Description</label>
      <input id="newDesc" type="text" name="description" bind:value={$editTodoForm.description} class="p-2 border" />
    </div>
    <button type="submit" class="p-2 bg-green-500">Edit</button>
    <button on:click={() => (editFlag = false)} type="button" class="p-2 border">Cancel</button>
  </form>
{/if}
<ul class="max-w-[700px]">
  {#if todos && todos.length > 0}
    {#each todos as todo, i}
      <li class="flex justify-between gap-4 mb-2">
        <a href="/details/{todo.id}" class="flex justify-between flex-1">
          <span>{todo.title}</span>
          <span>{todo.description}</span>
        </a>
        <div class="flex gap-4">
          <button on:click={() => stageEdit(i)} class="bg-green-500 hover:opacity-70">Edit</button>
          <form method="POST" use:deleteEnhance action="?/deleteTodo">
            <input type="hidden" value={todo.id} name="id" />
            <button class="bg-red-500 hover:opacity-70">Delete</button>
          </form>
        </div>
      </li>
    {/each}
  {/if}
</ul>
