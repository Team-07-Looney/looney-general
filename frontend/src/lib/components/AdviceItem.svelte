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

    const adviceElement = document.getElementById(`adviceElement${id}`);
    if (storedAdviceId === 0) {
      adviceElement.classList.add("bg-accent");
      adviceElement.classList.remove("bg-white");
      storedAdviceId = id;
    } else {
      const previousadviceElement = document.getElementById(
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
on:keypress={() => handleAdviceSelection(adviceId)}
role="button"
tabindex="0"
>
  <p class="font-semibold">{name}</p>
  <div class="flex justify-center max-h-24">
    <img src="../../../../src/img/adviceIcons/{name}.png"
    alt="advice" class="object-cover h-full mt-4">
  </div>
  <span class="align-text-bottom" style="margin-top: auto;">{group}</span>
</div>
