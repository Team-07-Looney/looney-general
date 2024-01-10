<script>
    import WhiteBanner from "../../../../../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../../../../../lib/components/BottomMenu.svelte";
    import ProgressBar from "../../../../../../lib/components/ProgressBar.svelte";
    import AdviceItem from "../../../../../../lib/components/AdviceItem.svelte";
    export let data;
    export let form;
    export let adviceId;

    function handleAdviceClick(event) {
    console.log("Advice clicked:", event.detail.adviceId);
    adviceId = event.detail.adviceId;
  }
  let storedAdviceId = 0;
</script>
<WhiteBanner
    title="My Mood"
    description="Gain more insight in how you are feeling, Looney will always be there"
    imgExtraPath="../../../../"
    displayBackButton=1
    route="/moods/my-mood/{data.recordId}/thought"
/>
<div class="bg-white z-20 mt-2 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center shadow-lg">
    <div class="flex justify-center items-center flex-col">
        <h2 class="text-xl text-center">Statistics</h2>
        <ProgressBar total={data.statistics.total} progress={data.statistics.positive} icon="happy" color="bg-[#ccd3fc]" />
        <ProgressBar total={data.statistics.total} progress={data.statistics.neutral} icon="neutral" color="bg-[#9b9dd1]" />
        <ProgressBar total={data.statistics.total} progress={data.statistics.negative} icon="sad" color="bg-[#666e9f]" />
        <form method="POST" action="?/createAdvice" class="w-full">
           
           <h2 class="text-xl text-center">Select an advice:</h2>
           <div class="flex bg-gray-200 rounded-lg h-52 p-1">
            {#each data.finalAdvice as advice}
              <AdviceItem name={advice.name} group={advice.groupName} adviceId={advice.id} bind:storedAdviceId on:adviceSelected={handleAdviceClick}/>
           {/each}
          </div>
            {#if form && form.errors}
            <div
              class="bg-red-200 bg-opacity-60 text-red-800 p-4 rounded-lg"
            >
              <p class="text-sm pb-2">
                Uh oh! There seems to be an issue with your story:
              </p>
              <ul class="text-sm">
                {#each form?.errors as error}
                  {#if error.message}
                    <li class="error">
                      * {error.message}
                    </li>
                  {/if}
                {/each}
              </ul>
            </div>
          {/if}
          <input type="hidden" name="adviceId" bind:value={adviceId} />
            <div class="flex flex-row gap-8 justify-center items-center mt-2">
                <a
                    class="z-10 flex justify-center items-center bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
                    href="/moods">Skip</a
                >
                {#if adviceId}
                <button
                    class="z-10 bg-indigo-300 text-white font-bold p-2 rounded-lg w-20"
                    type="submit">Submit</button
                >
                {/if}
            </div>
        </form>
    </div>
</div>

<BottomMenu imgPath="../../../" displayMoodText="1" />
