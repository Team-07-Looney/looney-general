<script>
  import { createEventDispatcher } from "svelte";

  export let name;
  export let group;
  export let adviceId;
  export let storedAdviceId;

  const dispatch = createEventDispatcher();

  function handleAdviceSelection(id) {
    dispatch("adviceSelected", {
      adviceId: id, // pass the id directly
    });

    let adviceElement = document.getElementById(`adviceElement${id}`);
    if (storedAdviceId === 0) {
      adviceElement.classList.add("bg-accent");
      adviceElement.classList.remove("bg-white");
      storedAdviceId = id;
    } else {
      let previousadviceElement = document.getElementById(
        `adviceElement${storedAdviceId}`,
      );
      previousadviceElement.classList.remove("bg-accent");
      previousadviceElement.classList.add("bg-white");
      adviceElement.classList.add("bg-accent");
      adviceElement.classList.remove("bg-white");
      storedAdviceId = id;
    }
  }
</script>

<div
  id="{`adviceElement${adviceId}`}"
  class="flex flex-col bg-white rounded-lg shadow-lg p-2 w-1/2 text-center m-1 "
  on:click={() => handleAdviceSelection(adviceId)}
>
  <p class="font-semibold">{name}</p>
  <span class="align-text-bottom" style="margin-top: auto;">{group}</span>
</div>
