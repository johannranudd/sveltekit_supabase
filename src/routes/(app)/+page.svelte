<script lang="ts">
  import type { User } from "../../types/user"
  import supabase from "../../config/supabaseClient"

  export let data: { user: User }
  console.log(supabase)
</script>

<h1>Welcome {data.user.name}</h1>
