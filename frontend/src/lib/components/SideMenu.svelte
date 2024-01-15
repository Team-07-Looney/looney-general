<script>
  import { fly } from "svelte/transition";
</script>

<div
  in:fly={{ x: 200, duration: 500 }}
  out:fly={{ x: 200, duration: 700 }}
  class="z-10 absolute right-0 w-1/2 bg-lavender-50 h-screen top-0 pt-20 px-3"
>
  <div
    class="flex flex-row gap-2 items-center border-2 p-1 rounded-xl border-blue-200 bg-blue-50 mb-4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-9 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5
        7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
    <a href="/profile" type="button" class="p-1.5 w-full"
      ><p class=" text-2xl">Profile</p></a
    >
  </div>
  <div
    class="flex flex-row gap-2 items-center border-2 p-1 rounded-xl border-blue-200 bg-blue-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-9 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0
        0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
      />
    </svg>
    <a href="/logout" type="button" class="p-1.5 w-full"
      ><p class=" text-2xl">Logout</p></a
    >
  </div>
</div>
