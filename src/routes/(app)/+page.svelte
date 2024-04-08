<script lang="ts">
  import type { User } from "../../types/user"

  export let data: { user: User }
</script>

<h1>Welcome {data.user.name}</h1>
