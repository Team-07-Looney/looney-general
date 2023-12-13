<script>
    import { setContext } from "svelte";
    import { onMount } from "svelte";
    import Header from "../../lib/components/Header.svelte";
    import CategoryItem from "../../lib/components/CategoryItem.svelte";
 
    // Data contains all data passed by the page server
    export let data;
   
    let menuOpen = false;
    let storedId = 0;
    let dropdown;
    
    onMount(() => {
      window.addEventListener("click", (event) => {
        if (storedId !== 0 && menuOpen && event.target !== dropdown) {
          console.log(storedId)
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
 
<Header title="My Habits" route="/home" displayBackButton=1 displayMenu=1 />
 
<div style="margin-top: 10px; z-index: 5">
  {#each data.categories as category}
    <div class="bg-white rounded-xl p-1 shadow-lg ml-4 mr-4 mb-4">
      <CategoryItem title={category.name} categoryId={category.id} on:click={handleOpening(category.id)} />
    </div>
  {/each}
  </div>
 
<div class="flex justify-center items-center relative" style="z-index: 10;">
<a class="p-2" href="/categories/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10" alt="Add a habit"></a>
</div>