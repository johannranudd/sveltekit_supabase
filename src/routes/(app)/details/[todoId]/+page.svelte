<script lang="ts">
  export let data
  const { todo } = data
</script>

<h1>Details</h1>
<h1>Todo ID: {todo && todo[0]?.id}</h1>
{#if todo && todo[0]}
  {#each Object.entries(todo[0]) as [key, value]}
    <p>{key}: {value}</p>
  {/each}
{/if}
