<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let reasonId;
  export let storedReasonId;

  const dispatch = createEventDispatcher();

  function handleReasonSelection(id) {
    dispatch("reasonSelected", {
      reasonId: reasonId,
    });

    let reasonElement = document.getElementById(`reasonElement${id}`);
    if (storedReasonId == 0) {
      reasonElement.classList.add("bg-gray-400");
      storedReasonId = id;
    } else {
      let previousreasonElement = document.getElementById(
        `reasonElement${storedReasonId}`,
      );
      previousreasonElement.classList.remove("bg-gray-400");
      reasonElement.classList.add("bg-gray-400");
      storedReasonId = id;
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="reasonElement{reasonId}"
  class="font-light active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 bg-gray-200 rounded-lg py-1 px-3"
  on:click={handleReasonSelection(reasonId)}
>
  <h1 class="text-base"><strong>{title}</strong></h1>
</div>
