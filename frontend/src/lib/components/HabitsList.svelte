<script>
    export let title;
    export let time;
    export let iconCount;
    export let habitId;
    export let menuOpen;
    export let storedId;
   
    function handleOpening(id){
        let dropdown = document.getElementById(`dropdown${id}`);

        if (menuOpen == false) {
        // Displays menu
        dropdown.style.display = "block";
        menuOpen = true;
        storedId = id;
        } else if(storedId != id) {
            // Closes previous dropdown and opens the new one
            document.getElementById(`dropdown${storedId}`).style.display = "none";
            dropdown.style.display = "block";
            storedId = id;
            console.log('3rd con');
        } else {
            // Closes the dropdown
            dropdown.style.display = "none";
            menuOpen = false;
            storedId = id;
        }
    }
</script>
  <!--Clickable-->
<div class="bg-white rounded-xl shadow-lg p-1 flex justify-between">
    <a href={`habits/${habitId}`} class="flex w-full">
        <div>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                src={`../../src/img/icon${iconCount}.png`}
                style="height: 50px;"
                class="p-2"
            />
        </div>
        <div>
            <h1 class="text-lg"><strong>{title}</strong></h1>
            <p>Start time {time}</p>
        </div>
    </a>
 
    <div class="inline-block relative text-center">
        <button id={`button${habitId}`} on:click={() => handleOpening(habitId)} class="p-3 pl-0 mt-1">
            <img src="../../src/img/optionsButton.png" class="h-5">
        </button>
        <div id={`dropdown${habitId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] z-[1] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-12px]">
            <!-- MENU -->
            <div>
                <a class="p-1.5 rounded-lg mt-3" href={`habits/${habitId}/edit`}>Edit</a>
            </div>
            <div>
                <form class="w-full rounded-lg p-1" method="POST" action={`/habits/${habitId}?/deleteHabit`}>
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>