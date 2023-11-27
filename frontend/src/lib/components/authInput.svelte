<script>
  export let name;
  export let type;
  export let label;
  export let placeholder;
  export let path;
</script>

<div>
  <label for="{name}" class="text-gray-700 text-base">{label}</label>
  <div class="flex items-center border-b border-gray-700 pb-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="{path}"
      />
    </svg>
    <input
      class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="{type}"
      name="{name}"
      placeholder="{placeholder}"
      aria-label="{label}"
    />
  </div>
</div>
