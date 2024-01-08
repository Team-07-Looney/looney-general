<script>
    import { fly } from "svelte/transition";
</script>


<div in:fly={{x:200, duration:500}} out:fly={{x:200, duration:700}} class="z-10 absolute right-0 w-1/2 bg-zinc-50 h-screen top-0 pt-20">
    <div class="flex flex-row gap-2 items-center border-b border-black bg-zinc-200">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-9 h-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      <a href="/profile" type="button" class="p-1.5 w-full"><p class=" text-2xl">Profile</p></a>
    </div>
</div>