<script>
    import { openPopup } from "../popup";
    import DeleteConfirmationPopup from "../../lib/components/DeleteConfirmationPopup.svelte";
    export let iconId;
    export let title;
    export let categoryId;
</script>

<DeleteConfirmationPopup
    name='category'
    explanation='If you delete this category, all the habits inside will be deleted as well.' />
<div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center
min-h-[68px] hover:bg-accent" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <a href={`categories/${categoryId}/habits`} class="flex w-full">
        <div class="min-w-[50px] flex items-center">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <p class="text-3xl">{@html iconId}</p>
        </div>
        <div class="flex items-center max-w-[180px]">
            <h1 class="text-lg ml-3 max-w-24"><strong>{title}</strong></h1>
        </div>
    </a>
    <div class="inline-block relative text-center z-5">
        <button id={`button${categoryId}`} on:click|stopPropagation class="p-3 pl-0 mt-1 mr-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button" />
        </button>
        <div id={`dropdown${categoryId}`}
        class="hidden absolute bg-gray-200 flex-auto rounded-md shadow-lg
        min-w-[70px] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px] ml-[-1.2rem] z-10">
            <!-- DROPDOWN MENU -->
            <div class="h-6 flex justify-center items-center">
                <a class="rounded-lg" href={`categories/${categoryId}/edit`}>Edit</a>
            </div>
            <div class="h-7 flex justify-center items-center">
                <form id="deleteForm" class="w-full rounded-lg" method="POST" action={`/categories/${categoryId}?/deleteCategory`}>
                    <button on:click|preventDefault={openPopup}>Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
