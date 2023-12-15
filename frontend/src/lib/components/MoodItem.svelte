<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let moodId;

  const dispatch = createEventDispatcher();
  let active = false;

  function handleMoodSelection() {
    active = true;
    dispatch("moodSelected", {
      moodId: moodId,
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="{active?"bg-gray-400":""} font-light active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 bg-gray-100 rounded-lg py-1 px-3"
  on:click={handleMoodSelection}
>
  <h1 class="text-base"><strong>{title}</strong></h1>
</div>
