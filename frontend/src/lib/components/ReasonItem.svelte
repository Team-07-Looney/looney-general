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
      reasonElement.classList.add("bg-accentColor");
      storedReasonId = id;
    } else {
      let previousreasonElement = document.getElementById(
        `reasonElement${storedReasonId}`,
      );
      previousreasonElement.classList.remove("bg-accentColor");
      reasonElement.classList.add("bg-accentColor");
      storedReasonId = id;
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="reasonElement{reasonId}"
  class="font-light focus:outline-none focus:ring focus:ring-gray-300 bg-gray-100 rounded-lg py-1 px-3"
  on:click={handleReasonSelection(reasonId)}
>
  <h1 class="text-base"><strong>{title}</strong></h1>
</div>
