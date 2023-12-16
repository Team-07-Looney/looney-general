<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let moodId;
  export let storedMoodId;

  const dispatch = createEventDispatcher();

  function handleMoodSelection(id) {
    dispatch("moodSelected", {
      moodId: moodId,
    });

    let moodElement = document.getElementById(`moodElement${id}`);
    if (storedMoodId == 0) {
      moodElement.classList.add("bg-gray-400");
      storedMoodId = id;
    } else {
      let previousMoodElement = document.getElementById(
        `moodElement${storedMoodId}`,
      );
      previousMoodElement.classList.remove("bg-gray-400");
      moodElement.classList.add("bg-gray-400");
      storedMoodId = id;
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="moodElement{moodId}"
  class="font-light active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 bg-gray-100 rounded-lg py-1 px-3"
  on:click={handleMoodSelection(moodId)}
>
  <h1 class="text-base"><strong>{title}</strong></h1>
</div>
