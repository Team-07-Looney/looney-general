<script>
  import { onMount } from "svelte";
  import CategoryItem from "../../lib/components/CategoryItem.svelte";
  import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../lib/components/BottomMenu.svelte";
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
    <title>Categories</title> 
</svelte:head>

<WhiteBanner
  title="My Habits"
  description="Add new ones, check the old ones, Looney is going to be with you"
  route="/home"
  displayBackButton="1"
  imgExtraPath="../"
/>

{#if data.filteredCategoriesByUser.length == 0}
  <div
    class="rounded-xl p-1 shadow-lg text-center mr-10 ml-10 pt-2 pb-2 mt-4 bg-accent"
  >
    <h1 class="font-bold">Create a Routine!</h1>
    <p>
      Here you can organize your habits<br />based on different routines.<br
      />You can add up to 5 categories.
    </p>
  </div>
{:else}
  <div
    class="flex justify-center items-center pt-9 position:relative z-index-0"
  >
    <div class="flex flex-col ml-2 h-[22rem] items-center w-80 px-1 gap-2 z-0">
      {#each data.filteredCategoriesByUser as category}
        <CategoryItem
          title={category.name}
          categoryId={category.id}
          on:click={handleOpening(category.id)}
        />
      {/each}
    </div>
  </div>
{/if}

{#if data.filteredCategoriesByUser.length < 5}
  <div class="flex justify-center items-center absolute bottom-[5.2rem] w-full">
    <a class="p-2" href="/categories/create"
      ><img src="../src/img/addFolder.png" class="h-16" alt="Add a folder" /></a
    >
  </div>
{/if}
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
