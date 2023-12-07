<script>
    import { setContext } from "svelte";
    import Header from "../../lib/components/Header.svelte";
    import HabitItem from "../../lib/components/HabitItem.svelte";
  
    // Data contains all data passed by the page server
    export let data;
    
    let menuOpen = false;
    let storedId = 0;

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

<Header title="Habits" route="/main" displayBackButton=1 displayMenu=1 />

<ul style="overflow-y: scroll; height:305px; margin-top: 110px; position:relative; z-index: 5">
  {#each data.habits as habit}
    <li class="px-10 py-2">
      <HabitItem title={habit.name} time={habit.start_time} iconCount={habit.id%4} habitId={habit.id} on:click={handleOpening(habit.id)} />
    </li> 
  {/each}
</ul>

<div class="flex justify-center items-center relative" style="z-index: 10;">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10" alt="Add a habit"></a>
</div>