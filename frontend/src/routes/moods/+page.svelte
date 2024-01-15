<script>
  import showElement from "$lib/showElement";
  import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../lib/components/BottomMenu.svelte";
  import MyMoodsButtons from "../../lib/components/MyMoodsButtons.svelte";
  $showElement = false;
</script>

<WhiteBanner
  title="My Moods"
  description="Gain more insight in how you are feeling, Looney will always be there"
  route="/home"
  displayBackButton="1"
  imgExtraPath="../"
/>

<div
  class="grid grid-cols-2 grid-rows-2 justify-items-center gap-6 mt-12 w-full px-4"
>
  <MyMoodsButtons
    buttonName="My Mood"
    buttonIcon="myMoodOctopus.png"
    buttonLink="/moods/my-mood"
  />
  <MyMoodsButtons
    buttonName="Thoughts"
    buttonIcon="thoughtsOctopus.png"
    buttonLink="moods/thoughts"
  />
  <MyMoodsButtons
    buttonName="Tracker"
    buttonIcon="trackerOctopus.png"
    buttonLink="/"
  />
  <MyMoodsButtons buttonName="Map" buttonIcon="mapOctopus.png" buttonLink="/" />
</div>
<BottomMenu imgPath="../../../" displayMoodText="1" />
