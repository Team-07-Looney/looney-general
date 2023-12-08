<script>
    import OctopusButton from "../../lib/components/OctopusButton.svelte";
    import Header from "../../lib/components/Header.svelte";
</script>

<Header title="Moods" displayBackButton="1" displayMenu="1" route="/main"/>
<div class="flex flex-col justify-center items-center mt-20">
    <div class="flex flex-row">
        <OctopusButton
            buttonName="My Mood"
            buttonIcon="moodOctopus.png"
            buttonLink="/moods/my-mood"
        />
        <OctopusButton
            buttonName="Thoughts"
            buttonIcon="thoughtsOctopus.png"
            buttonLink="/thoughts"
        />
    </div>
    <!-- <div class="flex flex-row">
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
    </div> -->
</div>
