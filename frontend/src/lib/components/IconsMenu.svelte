 <script>
    import { createEventDispatcher } from "svelte";
    import { A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50, A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae } from 'svelte-twitter-emoji';
    export let storedIconId;
    export let iconId;
    const iconComponents = { A1F315, A1F316, A1F318, A1F313, A1F311, A1F320, A2600, A2B50, A1F33b, A1F338, A1F4aa1f3fc, A1F98b, A1F3bc, A1F4af, A1F4d5, A2764, A2708, A1F3ae };
    const dispatch = createEventDispatcher();
    
    function handleIconSelection(id) {
        dispatch("iconSelected", {
            iconId: id,
        });

        let icon = document.getElementById(id);
        if (iconId == null) {
            icon.classList.add("bg-accent");
            iconId = id;
            storedIconId = id;
        } else {
            let previousIcon = document.getElementById(storedIconId);
            previousIcon.classList.remove("bg-accent");
            icon.classList.add("bg-accent");
            storedIconId = id;
            iconId = id;
        }
    }
</script>

<div class="border-black-300 border-2 p-1">
    {#each Array.from({ length: Object.keys(iconComponents).length / 6 }) as _, i}
        <div class="flex">
            {#each Object.values(iconComponents).slice(i * 6, (i + 1) * 6) as icon}
                <svelte:component this={icon} size="45" bind:id={icon} on:click={handleIconSelection(icon)} class="p-2" />
            {/each}
        </div>
    {/each}
</div>
