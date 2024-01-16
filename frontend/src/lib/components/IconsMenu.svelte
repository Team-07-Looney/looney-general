<script>
  import { createEventDispatcher } from "svelte";
  import { A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50, A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae } from "svelte-twitter-emoji";
  export let storedIconId;
  export let iconId;
  const iconComponents = { A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50,
    A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae };
  const dispatch = createEventDispatcher();

  export function showPreviousSelection(id) {
    const selectedIcon = iconComponents[id];
    if (id){
      const icon = document.getElementById(selectedIcon);
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
        
    if (iconId == null || iconId === storedIconId) {
      if (iconId === storedIconId) {
        const selectedIcon = iconComponents[storedIconId];
        const previousIcon = document.getElementById(selectedIcon);
        previousIcon.classList.remove("bg-accent", "border-zinc-950");
      }
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

<div class="border-black-300 border-2 p-1">
  <!-- eslint-disable-next-line no-unused-vars -->
  {#each Array.from({ length: Object.keys(iconComponents).length / 6 }) as _, i}
      <div class="flex">
        {#each Object.values(iconComponents).slice(i * 6, (i + 1) * 6) as icon}
          <svelte:component this={icon} size="44" bind:id={icon}
          on:click={handleIconSelection(icon)} class="p-2 border-2 border-white" />
        {/each}
      </div>
  {/each}
</div>
