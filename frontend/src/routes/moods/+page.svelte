<script>
    import OctopusButton from "../../lib/components/OctopusButton.svelte";
    import Header from "../../lib/components/Header.svelte";
    import showElement from '$lib/showElement';
    import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../lib/components/BottomMenu.svelte";
    $showElement = false;
    
</script>
<WhiteBanner
title="My Moods"
description="Gain more insight in how you are feeling, Looney will always be there
"
route="/home"
displayBackButton="1"
imgExtraPath="../"
/>

<div class="flex flex-col justify-center items-center mt-6">
    <div class="flex flex-row gap-4">
        <OctopusButton
            buttonName="My Mood"
            buttonIcon="myMoodOctopus.png"
            buttonLink="/moods/my-mood"
        />
        <OctopusButton
            buttonName="Thoughts"
            buttonIcon="thoughtsOctopus.png"
            buttonLink="moods/thoughts"
        />
    </div>
    <div class="flex flex-row gap-4 mt-4">
        <OctopusButton
            buttonName="Tracker"
            buttonIcon="trackerOctopus.png"
            buttonLink="/"
        />
        <OctopusButton
            buttonName="Map"
            buttonIcon="mapOctopus.png"
            buttonLink="/"
        />
    </div>
</div>
<BottomMenu imgPath="../../../" displayMoodText="1" />