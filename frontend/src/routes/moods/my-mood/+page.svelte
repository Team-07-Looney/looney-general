<script>
  import { getContext } from "svelte";
  import Header from "../../../lib/components/Header.svelte";
  import MoodItem from "../../../lib/components/MoodItem.svelte";
  import ReasonItem from "../../../lib/components/ReasonItem.svelte";
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
</script>

<Header title="My mood" displayBackButton="1" displayMenu="1" route="/moods" />
<div
  class="bg-white mt-24 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center"
>
<form method="POST" action="?/createRecord">

  <div class="flex">
    <h2 class="text-xl">How do you feel?</h2>
  </div>
  <div class="flex flex-row">
    <ul>
      {#each data.moods as mood}
        <li class="px-4 py-2 flex-auto" id="element">
          <MoodItem
            title={mood.name}
            moodId={mood.id}
            on:moodSelected={handleMoodClick}
          />
        </li>
      {/each}
    </ul>
  </div>

  <div class="flex">
    <h2 class="text-xl">Why do you feel this way?</h2>
  </div>
  <div class="flex flex-row">
    <ul>
      {#each data.reasons as reason}
          <li class="px-4 py-2 flex-auto" id="element">
          <ReasonItem
            title={reason.name}
            reasonId={reason.id}
            on:reasonSelected={handleReasonClick}
          />
          </li>
      {/each}
    </ul>
  </div>


  <input type="hidden" name="moodId" bind:value={moodId} />
  <input type="hidden" name="reasonId"  bind:value={reasonId} />
  <div class="flex flex-row gap-8">
    <a
      class="bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
      style="z-index: 10;"
      href="/moods"
    >Cancel</a>
    <div class="flex justify-center items-center relative" style="z-index: 10;">
      <button
        class="bg-indigo-300 text-white font-bold p-2 rounded-lg w-20"
        type="submit"
      >Next</button>
    </div>
  </div>
</form>
</div>