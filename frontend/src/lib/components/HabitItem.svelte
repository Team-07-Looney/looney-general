<script>
    import { openPopup } from "../popup";
    import DeleteConfirmationPopup from "./DeleteConfirmationPopup.svelte";

    export let title;
    export let time;
    export let habitId;
    export let categoryId;
    export let done;
</script>

<DeleteConfirmationPopup name='habit' />
<div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between
items-center hover:bg-accent" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <a href={`habits/${habitId}`} class="flex w-full">
        <div>
            {#if !done}
                <img
                    src={"../../src/img/checkUndone.png"}
                    class="p-2 object-scale-down"
                    alt="icon"
                />
            {:else}
                <img
                    src={"../../src/img/checkDone.png"}
                    class="p-2 object-scale-down"
                    alt="icon"
                />
            {/if}
        </div>
        <div class="flex flex-col">
            <h1 class="text-lg"><strong>{title}</strong></h1>
            <p>Start time {time}</p>
        </div>
    </a>
    <div class="inline-block relative text-center">
        <button id={`button${habitId}`} on:click|stopPropagation class="p-3 pl-0 mt-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button">
        </button>
        <div id={`dropdown${habitId}`} class="hidden absolute bg-gray-200 flex-auto rounded-md shadow-lg min-w-[70px] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px] ml-[-1.2rem]">
            <!-- DROPDOWN MENU -->
            <div class="h-[2rem] flex justify-center items-center">
                <a class="rounded-lg" href={`/categories/${categoryId}/habits/${habitId}/edit`}>Edit</a>
            </div>
            <div>
                <form id="deleteForm" class="w-full rounded-lg p-1" method="POST" action={`/categories/${categoryId}/habits/${habitId}?/deleteHabit`}>
                    <button on:click|preventDefault={openPopup}>Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
