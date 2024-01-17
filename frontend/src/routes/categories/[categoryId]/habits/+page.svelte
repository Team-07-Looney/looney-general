<script>
  import { onMount } from "svelte";
  import HabitItem from "../../../../lib/components/HabitItem.svelte";
  import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";
  $showElement = false;
  // Data contains all data passed by the page server
  export let data;

  let menuOpen = false;
  let storedId = 0;
  let dropdown;

  onMount(() => {
    window.addEventListener("click", (event) => {
      if (storedId !== 0 && menuOpen && event.target !== dropdown) {
        document.getElementById(`dropdown${storedId}`).style.display = "none";
        menuOpen = false;
      }
    });
  });

  function handleOpening(id) {
    const dropdown = document.getElementById(`dropdown${id}`);

    if (!menuOpen) {
      // Displays menu
      dropdown.style.display = "block";
      menuOpen = true;
      storedId = id;
    } else if (storedId != id) {
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

<svelte:head>
  <title>Habits</title>
</svelte:head>

<WhiteBanner
  title={data.category[0].name}
  description="Add new ones, check the old ones, Looney is going to be with you"
  route="/categories"
  displayBackButton="1"
  imgExtraPath="../"
/>

{#if data.filteredHabitsByCategory.length == 0}
  <div
    class="rounded-xl p-1 shadow-lg text-center mr-10 ml-10 pt-2 pb-2 mt-4 bg-accent"
  >
    <h1 class="font-bold">Let's get started!</h1>
    <p>Add your habits to the routine <br />by pressing on the plus button.</p>
  </div>
{:else}
  <div class="flex justify-center items-center pt-5 relative z-index-0 mb-3">
    <div
      class="flex flex-col overflow-y-scroll overflow-x-hidden
      ml-2 h-[19rem] items-center w-80 px-1 py-1 gap-2"
    >
      {#each data.filteredHabitsByCategory as habit}
        <HabitItem
          title={habit.name}
          done={habit.done}
          time={habit.start_time}
          categoryId={habit.category_id}
          habitId={habit.id}
          on:click={handleOpening(habit.id)}
        />
      {/each}
    </div>
  </div>
{/if}

<div class="flex justify-center items-center absolute bottom-[5.2rem] w-full">
  <a class="p-2" href="/categories/{data.category[0].id}/habits/create"
    ><img src="../../src/img/addHabit.png" class="h-16" alt="Add a habit" /></a
  >
</div>
<BottomMenu imgPath="../" displayHabitText="1" />

<style>
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
