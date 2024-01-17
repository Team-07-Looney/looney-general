<script>
  import { createEventDispatcher } from "svelte";
  export let storedIconId;
  export let iconId;
  const icons = ["&#127765", "&#127763", "&#127761", "&#127775", "&#127757", "&#128171",
    "&#128512", "&#128513", "&#128519", "&#128521", "&#128522", "&#128523",
    "&#128529", "&#128514", "&#128558", "&#128538", "&#128539", "&#128579",
    "&#128077","&#128170", "&#129311", "&#10024", "&#128147", "&#128169",
    "&#128187", "&#128213", "&#128747", "&#128763", "&#128012", "&#128036",
    "&#128039", "&#128055", "&#127871", "&#127829", "&#129365", "&#127860",
    "&#127794", "&#127801", "&#127812", "&#127942", "&#127952", "&#127936",
    "&#127918", "&#127754", "&#127925", "&#127929", "&#128175", "&#128176"];

  const dispatch = createEventDispatcher();

  export function showPreviousSelection(id) {
    if (id){
      const icon = document.getElementById(id);
      icon.classList.add("bg-accent", "border-zinc-950");
      iconId = id;
      storedIconId = id;
    }
  }
  
  function handleIconSelection(id) {
    dispatch("iconSelected", {
      iconId: id,
    });
    const icon = document.getElementById(id);
        
    if (iconId == null) {
      icon.classList.add("bg-accent", "border-zinc-950");
      iconId = id;
      storedIconId = id;
    } else {
      const previousIcon = document.getElementById(storedIconId);
      previousIcon.classList.remove("bg-accent", "border-zinc-950");
      icon.classList.add("bg-accent", "border-zinc-950");
      storedIconId = id;
      iconId = id;
    }
  }
</script>
<div class="grid grid-cols-6 border-black-300 border-2 p-1 h-40 overflow-scroll">
  {#each icons as icon}
    <div
      on:click={() => handleIconSelection(icon)}
      on:keypress={() => handleIconSelection(icon)}
      id={icon}
      role="button" tabindex="0"
      class="flex justify-center border-2 border-white rounded-lg"
    ><p class="text-3xl p-1">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html icon}</p>
    </div>
  {/each}
</div>

<style>
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
