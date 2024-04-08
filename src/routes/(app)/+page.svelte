<script lang="ts">
  import type { Todos } from "../../types/todos"

  export let data: Todos
  const { todos, error } = data
</script>

<h1 class="my-4 font-bold">Todos</h1>
{#if error}
  <p>An error occured fetching data</p>
{:else}
  <ul class="max-w-[400px]">
    {#each todos as todo}
      <li class="flex justify-between">
        <span>{todo.title}</span>
        <span>{todo.description}</span>
      </li>
    {/each}
  </ul>
{/if}
