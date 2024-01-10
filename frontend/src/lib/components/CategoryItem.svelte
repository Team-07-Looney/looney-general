<script>
    import { A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50, A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae } from 'svelte-twitter-emoji';
    export let iconId;
    export let title;
    export let categoryId;
    
    let iconComponent;
    const iconComponents = {A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50, A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae};
    iconComponent = iconComponents[iconId];
</script>

<div
    class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center min-h-[68px]"
    style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
>
    <a href={`categories/${categoryId}/habits`} class="flex w-full">
        <div class="min-w-[50px] flex items-center">
            <svelte:component this={iconComponent} size="33" class="m-1" />
        </div>
        <div class="flex items-center max-w-[180px]">
            <h1 class="text-lg ml-3 max-w-24"><strong>{title}</strong></h1>
        </div>
    </a>
    <div class="inline-block relative text-center z-5">
        <button id={`button${categoryId}`} on:click|stopPropagation class="p-3 pl-0 mt-1 mr-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button" />
        </button>
        <div id={`dropdown${categoryId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px]">
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
