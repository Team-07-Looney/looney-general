<script>
    import CircularProgressBar from './CircularProgressBar.svelte';
    export let title;
    export let categoryId;
</script>

<div class="flex justify-between">
    <a href={`categories/${categoryId}/habits`} class="flex">
        <CircularProgressBar />
        <h1 class="text-lg ml-3 mt-5"><strong>{title}</strong></h1>
    </a>
    <div class="ml-3 w-5/6 mt-2 relative inline-block">
        <button id={`button${categoryId}`} on:click|stopPropagation class="p-3 pl-0 mt-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button">
        </button>
        <div id={`dropdown${categoryId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] z-[1] right-0 divide-y-[1px] divide-gray-400 text-center">
            <!-- DROPDOWN MENU -->
            <div>
                <a class="p-1.5 rounded-lg mt-3" href={`categories/${categoryId}/edit`}>Edit</a>
            </div>
            <div>
                <form class="w-full rounded-lg p-1" method="POST" action={`/categories/${categoryId}?/deleteCategory`}>
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>