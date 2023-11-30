<script>
    import Button from "../../lib/components/Button.svelte";
    export let title;
    export let time;
    export let iconCount;
    export let habitId;

    let menuOpen = false;
</script>

<div class="bg-white rounded-xl shadow-2xl p-1 flex">
    <a href={`habits/${habitId}`}>
        <div style="clear: right;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="../../src/img/icon{iconCount}.png" style="height: 50px;" class="p-2"/>
        </div>
        <div style="float: right; clear:both">
            <h1 class="text-lg"><strong>{title}</strong></h1>
            <p>Start time {time}</p>
        </div>
    </a>

    <div class="dropdown" style="float: right;">
        <Button on:click={() => (menuOpen = !menuOpen)} {menuOpen} />
        <div id="myDropdown" class:show={menuOpen} class="dropdown-content">
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
        min-width: 80px;
        border: 1px solid #ddd;
        z-index: 1;
    }

    /* Show the dropdown menu */
    .show {
        display: block;
    }
</style>
