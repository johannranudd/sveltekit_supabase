<script lang="ts">
  import { superForm } from "sveltekit-superforms"
  import type { PageData } from "./$types"

  export let data: PageData

  const { form, message, enhance, errors } = superForm(data.form)
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <form method="POST" action="/logout">
    <button type="submit">Logout</button>
  </form>

  <form class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg" method="POST" use:enhance>
    <span>message: {$message}</span>
    <div class="mb-4">
      <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        bind:value={$form.email}
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
      />
      {#if $errors.email}
        <span class="text-sm text-destructive">{$errors.email}</span>
      {/if}
    </div>

    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={$form.password}
        class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
      />
      {#if $errors.password}
        <span class="text-sm text-destructive">{$errors.password}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-4">
      <button
        type="submit"
        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <a href="/register" class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800">
        Don't have a user? Click here to register
      </a>
    </div>
  </form>
</div>
