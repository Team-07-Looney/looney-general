<script>
    import { createEventDispatcher } from "svelte";
    export let omitBg = 0;
    export let name;
    export let group;
    </script>
<div
  class="flex flex-col {omitBg ? 'bg-advice': 'bg-accent'} rounded-lg shadow-lg p-2 w-1/2 text-center m-1 "
>
  <p class="font-semibold">{name}</p>
  <span class="align-text-bottom" style="margin-top: auto;">{group}</span>
</div>