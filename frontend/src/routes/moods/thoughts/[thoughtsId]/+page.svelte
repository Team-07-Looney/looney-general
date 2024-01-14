<script>
  // Data contains all data passed by the page server
  export let data;
  console.log(data);
  import showElement from "$lib/showElement";
  import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
  import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";

  $showElement = false;
  let icon;

  if (data.moodType === "Negative") {
    icon = "sad";
  } else if (data.moodType === "Positive") {
    icon = "happy";
  } else {
    icon = "neutral";
  }
</script>

<WhiteBanner
  title="My Thoughts"
  description="Vent out your feelings and look back at them to see your personal growth"
  route="/moods/thoughts"
  displayBackButton="1"
  imgExtraPath="../"
/>

<div
  class="bg-white mt-6 h-3/5 px-5 mx-6 pb-5 pt-2 flex flex-col rounded-xl gap-2"
>
  <div class="flex flex-row gap-6">
    <img src={`../../src/img/${icon}.png`} alt="emotion" class="h-14" />
    <div class=" text-center">
      <p class="underline text-4xl">{data.thoughts[0].title}</p>
      <p>{data.thoughtsDate}</p>
    </div>
  </div>
  <div
    class="bg-[#EDEDED] w-full h-full rounded-xl px-3 py-3 overflow-y-scroll"
  >
    <p class="text-xl">{data.thoughts[0].body}</p>
  </div>
</div>

<BottomMenu imgPath="../" displayMoodText="1" />

<style>
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
