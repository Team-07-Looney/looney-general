<script>
    import { setContext } from "svelte";
    import DeleteConfirmationPopup from "../../lib/components/DeleteConfirmationPopup.svelte";

    export let title;
    export let categoryId;
    let icon = categoryId % 3;

    setContext('closePopup', { closePopup });
    setContext('submitDelete', { submitDelete });

    function openPopup() {
        const confirmation = document.getElementById('confirmation');
        confirmation.classList.remove('hidden');
    }

    function closePopup() {
        confirmation.classList.add('hidden');
    }

    function submitDelete() {
        const form = document.getElementById('deleteForm');
        form.submit();
    }
</script>
<DeleteConfirmationPopup name='category' explanation='if you delete a category, its habits will be deleted as well' />
<div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center min-h-[68px]" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <a href={`categories/${categoryId}/habits`} class="flex w-full">
        <div class="min-w-[50px] flex items-center">
            <img alt="routine icon" src="../../src/img/routineIcon{icon}.png" class="object-scale-down p-2">
        </div>
        <div class="flex items-center max-w-[180px]">
            <h1 class="text-lg ml-3 max-w-24"><strong>{title}</strong></h1>
        </div>
    </a>
    <div class="inline-block relative text-center z-5">
        <button id={`button${categoryId}`} on:click|stopPropagation class="p-3 pl-0 mt-1 mr-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button">
        </button>
        <div id={`dropdown${categoryId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px]">
            <!-- DROPDOWN MENU -->
            <div>
                <a class="p-1.5 rounded-lg mt-3" href={`categories/${categoryId}/edit`}>Edit</a>
            </div>
            <div>
                <form id="deleteForm" class="w-full rounded-lg p-1" method="POST" action={`/categories/${categoryId}?/deleteCategory`}>
                    <button on:click|preventDefault={openPopup}>Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>