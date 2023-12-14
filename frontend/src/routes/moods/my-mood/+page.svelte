<script>
  import Header from "../../../lib/components/Header.svelte";
  import MoodItem from "../../../lib/components/MoodItem.svelte";
  let moods = document.getElementsByTagName("li");
  // moods.array.forEach(element => {
  //   console.log(element);
  // });
  // Data contains all data passed by the page server
  export let data;
</script>

<Header title="My mood" displayBackButton="1" displayMenu="1" route="/moods" />
<div
  class="bg-white mt-24 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center"
>
  <div class="flex flex-row">
    <h2 class="text-xl">How do you feel today?</h2>
  </div>
  <div class="flex flex-row">
    <ul>
      {#each data.moods as mood}
        <li class="px-10 py-2" id="element">
          <MoodItem title={mood.name} moodId={mood.id} />
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-row">
    <h2 class="text-xl">Why do you feel this way?</h2>
  </div>
  <div class="flex flex-row">
    <ul>
      {#each data.reasons as reason}
        <div class="px-10 py-2">
          <MoodItem title={reason.name} moodId={reason.id}/>
        </div>
      {/each}
    </ul>
  </div>
  <div class="flex flex-row gap-8">
    <a href="/moods" class="bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
    style="z-index: 10;"
      >Cancel
      </a
    >
    <div class="flex justify-center items-center relative" style="z-index: 10;">
    <a class="bg-indigo-300 text-white font-bold p-2 rounded-lg w-20" href="/moods/my-mood/thought">Next</a>
    </div>
  </div>
</div>
