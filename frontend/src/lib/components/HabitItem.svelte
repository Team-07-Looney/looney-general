<script>
    export let title;
    export let time;
    export let iconCount;
    export let habitId;
    export let categoryId;
</script>

<div class="bg-white rounded-xl p-1 flex justify-between" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <a href={`habits/${habitId}`} class="flex w-full">
        <div>
            <img
                src={`../../src/img/icon${iconCount}.png`}
                style="height: 50px;"
                class="p-2"
                alt="icon"
            />
        </div>
        <div>
            <h1 class="text-lg"><strong>{title}</strong></h1>
            <p>Start time {time}</p>
        </div>
    </a>
 
    <div class="inline-block relative text-center">
        <button id={`button${habitId}`} on:click|stopPropagation class="p-3 pl-0 mt-1">
            <img src="../../src/img/optionsButton.png" class="h-5" alt="Options Button">
        </button>
        <div id={`dropdown${habitId}`} class="hidden absolute bg-gray-200 flex-auto rounded-lg shadow-lg min-w-[70px] z-[1] grid-cols-1 divide-y-[1px] divide-gray-400 mt-[-14px]">
            <!-- DROPDOWN MENU -->
            <div>
                <a class="p-1.5 rounded-lg mt-3" href={`/categories/${categoryId}/habits/${habitId}/edit`}>Edit</a>
            </div>
            <div>
                <form class="w-full rounded-lg p-1" method="POST" action={`/categories/${categoryId}/habits/${habitId}?/deleteHabit`}>
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>