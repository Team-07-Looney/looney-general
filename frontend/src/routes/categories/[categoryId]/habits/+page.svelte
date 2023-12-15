<script>
    import { setContext } from "svelte";
    import { onMount } from "svelte";
    import HabitItem from "../../../../lib/components/HabitItem.svelte";
    import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
    // Data contains all data passed by the page server
    export let data;
    import showElement from '$lib/showElement';

$showElement = false;
    
    let menuOpen = false;
    let storedId = 0;
    let dropdown;

    onMount(() => {
      window.addEventListener("click", (event) => {
        if (storedId !== 0 && menuOpen && event.target !== dropdown) {
          document.getElementById(`dropdown${storedId}`).style.display = "none";
          menuOpen = false;
        }
      })
    });

    function handleOpening(id){
        let dropdown = document.getElementById(`dropdown${id}`);

        if (!menuOpen) {
        // Displays menu
        dropdown.style.display = "block";
        menuOpen = true;
        storedId = id;
        } else if(storedId != id) {
            // Closes previous dropdown and opens the new one
            document.getElementById(`dropdown${storedId}`).style.display = "none";
            dropdown.style.display = "block";
            storedId = id;
        } else {
            // Closes the dropdown
            dropdown.style.display = "none";
            menuOpen = false;
            storedId = id;
        }
    }
</script>

<style>
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  </style>
<WhiteBanner
title="{data.category[0].name}"
description="Add new ones, check the old ones, Looney is going to be with you"
route="/categories"
displayBackButton="1"
imgExtraPath="../"
/>

<ul style="overflow-y: scroll; height:305px; margin-top: 10px; position:relative; z-index: 5">
  {#each data.habits as habit}
    {#if data.category[0].id == habit.category_id} 
      <li class="px-10 py-2">
          <HabitItem title={habit.name} done={habit.done} time={habit.start_time} categoryId={habit.category_id} habitId={habit.id} on:click={handleOpening(habit.id)} />
      </li> 
    {/if}
  {/each}
</ul>

<div class="flex justify-center items-center relative" style="z-index: 10;">
<a class="p-2" href="/categories/{data.category[0].id}/habits/create"><img src="../../src/img/addButton.png" style="height: 50px;" class="h-10" alt="Add a habit"></a>
</div>
<BottomMenu imgPath="../" displayHabitText="1" />