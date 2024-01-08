<script>
  import { getContext } from "svelte";
  import Header from "../../../lib/components/Header.svelte";
  import MoodItem from "../../../lib/components/MoodItem.svelte";
  import ReasonItem from "../../../lib/components/ReasonItem.svelte";
  import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../lib/components/BottomMenu.svelte";

  // Data contains all data passed by the page server
  export let data;
  export let moodId;
  export let reasonId;

  function handleMoodClick(event) {
    console.log("Mood clicked:", event.detail.moodId);
    moodId = event.detail.moodId;
  }
  function handleReasonClick(event) {
    console.log("Reason clicked:", event.detail.reasonId);
    reasonId = event.detail.reasonId;
  }

  let storedMoodId = 0;
  let storedReasonId = 0;
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
  title="My Mood"
  description="Gain more insight in how you are feeling, Looney will always be there"
  route="/moods"
  displayBackButton="1"
  imgExtraPath="../"
  displayBackButton="1"
/>

<div
  class="bg-white z-20 mt-2 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center shadow-lg h-4/6 overflow-y-scroll overflow-x-hidden"
>
  <form method="POST" action="?/createRecord">
    <div class="flex justify-center items-center mt-14 pt-2">
      <h2 class="text-xl">How do you feel?</h2>
    </div>
    <div class="flex flex-wrap justify-center items-center mt-2 mb-2">
      {#each data.moods as mood}
      {#if mood.user_id == null || mood.user_id == data.userId}
        <div class="p-1" id="element">
          <MoodItem
            title={mood.name}
            moodId={mood.id}
            bind:storedMoodId
            on:moodSelected={handleMoodClick}
          />
        </div>
        {/if}
      {/each}
   <!-- add new mood button -->
      <a class="p-1" href="/moods/my-mood/createMood"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10" alt="Add a habit"></a>
    </div>

    <div class="flex justify-center items-center">
      <h2 class="text-xl">Why do you feel this way?</h2>
    </div>
    <div class="flex flex-wrap justify-center items-center mt-2">
      {#each data.reasons as reason}
      {#if reason.user_id == null || reason.user_id == data.userId}
        <div class="p-1" id="element">
          <ReasonItem
            title={reason.name}
            reasonId={reason.id}
            bind:storedReasonId
            on:reasonSelected={handleReasonClick}
          />
        </div>
        {/if}
      {/each}
      <!-- add new reason button -->
      <a class="p-1" href="/moods/my-mood/createReason"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10" alt="Add a habit"></a>
    </div>

    <input type="hidden" name="moodId" bind:value={moodId} />
    <input type="hidden" name="reasonId" bind:value={reasonId} />
    <div class="flex flex-row gap-8 justify-center items-center mt-2">
      <a
        class="z-10 flex justify-center items-center bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
        href="/moods">Cancel</a
      >
      {#if moodId && reasonId}
      <button class="z-10 bg-indigo-300 text-white font-bold p-2 rounded-lg w-20" type="submit">Next</button>
    {/if}
    </div>
  </form>
</div>
<BottomMenu imgPath="../../../" displayMoodText="1" />
