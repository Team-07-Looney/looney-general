<script>
    import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../../lib/components/BottomMenu.svelte";
    import ProgressBar from "../../../lib/components/ProgressBar.svelte";
    import AdviceTrackerItem from "../../../lib/components/AdviceTrackerItem.svelte";
    import showElement from "$lib/showElement";
    $showElement = false;
    export let data;
    if (data.mostRecordedReasonName !== null) {
        let lowerCaseReason = `${data.mostRecordedReasonName
            .charAt(0)
            .toUpperCase()}${data.mostRecordedReasonName.slice(1).toLowerCase()}`;
        if (lowerCaseReason.length > 10) {
            lowerCaseReason = `${lowerCaseReason.slice(0, 9)}...`;
        }
    }
</script>

<svelte:head>
    <title>Tracker</title>
</svelte:head>

<WhiteBanner
    title="Tracker"
    description="Check your progress, and find out patterns in your mood"
    route="/moods"
    displayBackButton="1"
    imgExtraPath="../"
/>
{#if data.statistics.total === 0}
    <div
        class="rounded-xl p-1 shadow-lg text-center mr-10 ml-10 pt-2 pb-2 mt-4 bg-[#fdefc7]"
    >
        <h1 class="font-bold">Track your Progress!</h1>

        <p>
            Here you will see your overall mood statistics after submitting
            something in "My Mood" page.
        </p>
    </div>
{:else}
    <div
        class="bg-white z-20 mt-2 p-3 mr-6 ml-6
rounded-lg min-h-fit flex flex-col justify-center items-center shadow-lg"
    >
        <div class="flex justify-center items-center flex-col">
            <p class=" text-lg text-center">Your Overall Mood</p>
            <ProgressBar
                total={data.statistics.total}
                progress={data.statistics.positive}
                icon="happy"
                color="bg-[#ccd3fc]"
                isTracker="true"
            />
            <ProgressBar
                total={data.statistics.total}
                progress={data.statistics.neutral}
                icon="neutral"
                color="bg-[#9b9dd1]"
                isTracker="true"
            />
            <ProgressBar
                total={data.statistics.total}
                progress={data.statistics.negative}
                icon="sad"
                color="bg-[#666e9f]"
                isTracker="true"
            />
        </div>
    </div>
    <div class="flex p-2 justify-center items-center text-center">
        <div class="bg-white shadow-lg p-1 rounded-lg w-40 mr-2 h-[130px]">
            <p class="text-lg">You have written</p>
            <p class="text-6xl font-chewy text-[#666e9f]">
                {data.totalThoughts}
            </p>
            <p class="text-lg">thoughts</p>
        </div>
        <div class="bg-white shadow-lg p-1 rounded-lg w-40">
            <p class="text-lg">You have picked</p>
            <p class="text-4xl font-chewy text-[#666e9f]">{lowerCaseReason}</p>
            <p class="text-lg">As the main cause<br />of your emotions</p>
        </div>
    </div>
    <div
        class="bg-white rounded-lg h-40 p-2 z-20 mt-2items-center shadow-lg mr-6 ml-6"
    >
        <p class="text-center text-lg">Your most picked advice:</p>
        <div class="flex">
            {#each data.mostFrequentAdvice as advice}
                <AdviceTrackerItem
                    name={advice.name}
                    group={advice.group_name}
                    omitBg="1"
                />
            {/each}
        </div>
    </div>
{/if}
<BottomMenu imgPath="../../../" displayMoodText="1" />
