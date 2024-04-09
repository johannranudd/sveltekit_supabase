<script lang="ts">
  import { signInWithEmail } from "~/services/auth"
  import { goto } from "$app/navigation"

  let email = ""
  let password = ""

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.")
      return
    }
    if (!password) {
      alert("Please enter your password")
      return
    }

    const data = await signInWithEmail(email, password)
    if (data && data.email && data.access_token) {
      //   localStorage.setItem("user", JSON.stringify({ email: data.email, access_token: data.access_token }))
      goto("/")
    }
    resetForm()
  }

  function resetForm() {
    email = ""
    password = ""
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <form class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg" on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
      />
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
