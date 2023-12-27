<script>
    import * as Icon from 'svelte-twitter-emoji';
  
    export let title;
    export let categoryId;
    export let iconId;

</script>

<div class="bg-white rounded-xl p-1 flex justify-between" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <a href={`categories/${categoryId}/habits`} class="flex w-full">
        <!-- <Icon. /> -->
        <h1 class="text-lg ml-3 mt-1"><strong>{title}</strong></h1>
    </a>
    <div class="inline-block relative text-center mt-0">
        <button id={`button${categoryId}`} on:click|stopPropagation class="p-3 pl-0 mt-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button">
        </button>
        <div id={`dropdown${categoryId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] z-[1] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px]">
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