<script>
    import BottomMenu from "../../../lib/components/BottomMenu.svelte";
    import ThoughtItem from "../../../lib/components/ThoughtItem.svelte";
    import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
    // Data contains all data passed by the page server
    export let data;
    import showElement from "$lib/showElement";

    $showElement = false;
</script>

<style>
    ::-webkit-scrollbar-thumb {
      background: gray;
      border-radius: 20px;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
</style>

<WhiteBanner
    title="My Thoughts"
    description="Vent out your feelings and look back at them to see your personal growth"
    route="/moods"
    displayBackButton="1"
    imgExtraPath="../"
/>

{#if data.filteredThoughtsByUser.length == 0}
    <div class="rounded-xl p-1 shadow-lg text-center pt-2 pb-2 ml-10 mr-10 mt-4 bg-[#fdefc7]">
        <h1 class="font-bold">Here you'll see your writings</h1>
        <p>After recording your mood<br />you can come back here to check it.</p>
    </div>
{:else}
    <div class="flex justify-center items-center pt-4">
        <div class="flex flex-col overflow-y-scroll overflow-x-hidden ml-2 h-96 items-center w-80 px-1 gap-2 mt-5">
            {#each data.filteredThoughtsByUser as thought}
                <ThoughtItem title={thought.title} date={data.thoughtsDate} iconType={data} />
            {/each}
        </div>
    </div>
{/if}

<BottomMenu imgPath="../" displayMoodText="1" />
