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

    const moodElement = document.getElementById(`moodElement${id}`);
    if (storedMoodId == 0) {
      moodElement.classList.add("bg-accent");
      moodElement.classList.remove("bg-gray-100");
      storedMoodId = id;
    } else {
      const previousMoodElement = document.getElementById(
        `moodElement${storedMoodId}`,
      );
      previousMoodElement.classList.remove("bg-accent");
      previousMoodElement.classList.add("bg-gray-100");
      moodElement.classList.add("bg-accent");
      moodElement.classList.remove("bg-gray-100");
      storedMoodId = id;
    }
  }
</script>

<!-- TODO: Fix the element-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="moodElement{moodId}"
  class="font-light focus:outline-none focus:ring
  focus:ring-gray-300 bg-gray-100 rounded-lg py-1 px-3"
  on:click={handleMoodSelection(moodId)}>
  <h1 class="text-base"><strong>{title}</strong></h1>
</div>
