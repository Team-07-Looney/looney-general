<script>
  import { createEventDispatcher } from "svelte";
  export let omitBg = 0;
  export let name;
  export let group;
</script>

<div class="flex flex-col {omitBg ? 'bg-advice': 'bg-accent'} rounded-lg shadow-lg p-2 w-1/2 text-center m-1">
  <p class="font-semibold">{name}</p>
  <div class="flex max-h-28 justify-center mb-2">
      <img src="../../src/img/adviceIcons/{name}.png" alt="advice image" class="object-cover h-full">
  </div>
  <span class="align-text-bottom" style="margin-top: auto;">{group}</span>
</div>
