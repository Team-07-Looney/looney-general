<script>
    export let title;
    export let time;
    export let iconCount;
    export let habitId;
 
    let menuOpen = false;
</script>
 
<div class="bg-white rounded-xl shadow-lg p-1 flex justify-between">
    <a href={`habits/${habitId}`} class="flex">
        <div>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                src="../../src/img/icon{iconCount}.png"
                style="height: 50px;"
                class="p-2"
            />
        </div>
        <div>
            <h1 class="text-lg"><strong>{title}</strong></h1>
            <p>Start time {time}</p>
        </div>
    </a>
 
    <div class="dropdown">
        <button on:click={() => (menuOpen = !menuOpen)} {menuOpen} class="p-3 pl-0 mt-1"><img src="../../src/img/optionsButton.png" class="h-5"></button>
        <div id="myDropdown" class:show={menuOpen} class="dropdown-content flex-auto">
            <!-- MENU -->
            <a class="p-1.5 rounded-lg mt-3" href={`habits/${habitId}/edit`}>Edit</a>
            <form class="w-full rounded-lg p-1" method="POST" action={`/habits/${habitId}?/deleteHabit`}>
                <button type="submit">Delete</button>
            </form>
        </div>
    </div>
</div>
 
<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }
 
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #e6e6e6;
        min-width: 70px;
        border: 1px solid #ddd;
        z-index: 1;
    }
 
    /* Show the dropdown menu */
    .show {
        display: block;
    }
</style>