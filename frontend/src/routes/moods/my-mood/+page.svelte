<script>
  import MoodItem from "../../../lib/components/MoodItem.svelte";
  import ReasonItem from "../../../lib/components/ReasonItem.svelte";
  import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";
  $showElement = false;
  // Data contains all data passed by the page server
  export let data;
  export let moodId = "";
  export let reasonId = "";

  function handleMoodClick(event) {
    moodId = event.detail.moodId;
  }
  function handleReasonClick(event) {
    reasonId = event.detail.reasonId;
  }

  let storedMoodId = 0;
  let storedReasonId = 0;
</script>
<svelte:head>
    <title>My Mood</title> 
</svelte:head>

<WhiteBanner
  title="My Mood"
  description="Gain more insight in how you are feeling, Looney will always be there"
  route="/moods"
  displayBackButton="1"
  imgExtraPath="../"
/>

<div
  class="bg-white z-20 mx-3 mt-3 px-3 py-3 rounded-lg flex flex-col shadow-lg h-[27rem]"
>
  <form method="POST" action="?/createRecord">
    <div class="flex justify-center items-center">
      <h2 class="text-xl">How do you feel?</h2>
    </div>
    <div
      class="flex flex-wrap justify-center
      items-center overflow-y-scroll overflow-x-hidden h-[7.9rem] py-1"
    >
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
      <a class="p-1" href="/moods/my-mood/createMood"
        ><img src="../src/img/addHabit.png" class="h-9" alt="Add a mood" /></a
      >
    </div>

    <div class="flex justify-center items-center mt-5">
      <h2 class="text-xl">Why do you feel this way?</h2>
    </div>
    <div
      class="flex flex-wrap justify-center
      items-center mt-2 overflow-y-scroll overflow-x-hidden h-[7.7rem]"
    >
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
      <a class="p-1" href="/moods/my-mood/createReason"
        ><img src="../src/img/addHabit.png" class="h-9" alt="Add a reason" /></a
      >
    </div>

    <input type="hidden" name="moodId" bind:value={moodId} />
    <input type="hidden" name="reasonId" bind:value={reasonId} />
    <div class="flex flex-row gap-8 justify-center items-center mt-6">
      <a
        class="z-[4] flex justify-center items-center
        bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
        href="/moods">Cancel</a
      >
      {#if moodId && reasonId}
        <button
          class="z-[4] bg-indigo-300 text-white font-bold p-2 rounded-lg w-20"
          type="submit">Next</button
        >
      {/if}
    </div>
  </form>
</div>
<BottomMenu imgPath="../../../" displayMoodText="1" />

<style>
  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
