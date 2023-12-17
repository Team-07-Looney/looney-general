<script>
    import BottomMenu from "../../../lib/components/BottomMenu.svelte";
    import ThoughtItem from "../../../lib/components/ThoughtItem.svelte";
    import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
    // Data contains all data passed by the page server
    export let data;
	import showElement from '$lib/showElement';

	$showElement = false;
    console.log(data);
</script>

<WhiteBanner
    title="My Thoughts"
    description="Vent out your feelings and look back at them to see your personal growth"
    route="/moods"
    displayBackButton="1"
    imgExtraPath="../"
/>

<div class="flex justify-center items-center pt-14">

<div class="flex flex-col overflow-y-scroll ml-2 h-80 items-center w-80 px-1 gap-2">
    {#if data.thoughts.length > 0}
        {#each data.thoughts as thought}
            <ThoughtItem title={thought.title} date={data.thoughtsDate}/>
        {/each}
    {:else}
        <p>lol</p>
    {/if}
</div>
</div>
<BottomMenu imgPath="../" displayMoodText="1" />
