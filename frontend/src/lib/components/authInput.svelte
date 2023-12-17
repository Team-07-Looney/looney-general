<script>
  export let name;
  export let type;
  export let label;
  export let placeholder;
  export let path;
  export let value = null;
  export let autocomplete = null;
  export let error = false;

  let color = error ? "red-700" : "black";

  let isFocused = false;
  const onFocus = () => (isFocused = true);
  const onBlur = () => (isFocused = false);
</script>

<div class="text-{color}">
  <label for={name} class="text-base">{label}</label>
  <div class="group">
    <div class="flex items-center border-b border-{color} pb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d={path} />
      </svg>
      <input
        class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none font"
        {type}
        {name}
        id={name}
        {placeholder}
        aria-label={label}
        on:focus={onFocus}
        on:blur={onBlur}
        value={value ? value : ""}
        {autocomplete}
      />
    </div>
    {#if isFocused && autocomplete == "new-password"}
      <p class="text-sm text-orange-500 mt-1">
        The password needs to be at least 12 characters long.
      </p>
    {/if}
  </div>
</div>
