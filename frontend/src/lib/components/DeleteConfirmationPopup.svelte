<script>
    import { closePopup, submitDelete } from "../popup";

    export let name;
    export let explanation = "";
</script>

<div id="confirmation" class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
    <div class="absolute gap-1 z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl py-2 px-3 flex flex-col w-80 justify-between items-center min-h-[68px]" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
        <p class="text-left text-xl font-semibold">Are you sure you want to delete this {name}?</p>
        {#if explanation}
            <p class="text-base leading-tight">{explanation}</p>
        {/if}
        <div class="flex flex-row gap-4 mt-4 items-end self-end">
            <button class="p-2 rounded-lg w-20 text-white font-bold" on:click={closePopup} style="background-color: #B4B4B4">Cancel</button>
            <button class="p-2 rounded-lg w-20 text-white font-bold" on:click={submitDelete} style="background-color: #9B9DD1">Delete</button>
        </div>
    </div>
</div>
