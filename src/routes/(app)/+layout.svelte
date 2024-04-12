<header class="bg-purple-500">
  <nav class="flex justify-between px-2 h-[70px] max-w-[1440px] mx-auto">
    <div class="flex items-center">
      <h1>Logo</h1>
    </div>
    <ul class="flex items-center gap-4 list-none">
      <li><a class="no-underline" href="./">Home</a></li>
      <li>
        <form method="POST" action="/logout">
          <button type="submit">Logout</button>
        </form>
      </li>
    </ul>
  </nav>
</header>

<div class="max-w-[1440px] mx-auto px-2">
  <slot />
</div>
