<script lang="ts">
  import { signUpNewUser } from "~/services/auth"

  let fullName = ""
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
    if (!fullName || !password) {
      alert("Please enter you full name, email and password")
      return
    }

    const registerSuccess = await signUpNewUser(email, password)
    if (registerSuccess) {
      alert(`User has been registered and an email has been sent to ${registerSuccess}`)
    }
    resetForm()
  }

  function resetForm() {
    fullName = ""
    email = ""
    password = ""
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <form class="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg" on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="fullName" class="block mb-2 text-sm font-bold text-gray-700">Full Name</label>
      <input
        type="text"
        id="fullName"
        bind:value={fullName}
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
      />
    </div>

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
        Register
      </button>
      <a href="/login" class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800">
        Already registered? Click here to log in
      </a>
    </div>
  </form>
</div>
