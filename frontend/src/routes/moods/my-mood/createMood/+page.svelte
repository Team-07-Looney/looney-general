<script>
  import AuthInput from "../../../../lib/components/authInput.svelte";
  import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";
  import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
  $showElement = false;
  /** @type {import('./$types').ActionData} */
  export let form;
  let selectedMoodType = ""; // Variable to track the selected mood type
</script>
<style>
  .selected-label {
    font-weight: bold;
  }
</style>
<WhiteBanner
  title="Add Mood"
  description="Add a mood that fits your emotions"
  displayBackButton="0"
  imgExtraPath="../"
  displayMenuButton="1"
/>
<div class="flex justify-center items-center mt-20">
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-1">
      <div class="px-8 pt-8 z-[3]">
        <div class="bg-white rounded-xl px-4 py-5">
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/createMood"
          >
            {#if form && form.errors}
              <div
                class="bg-red-200 text-red-900 p-2 rounded z-[50] fixed w-[250px] top-[75px]"
              >
                <p class="text-sm pb-2">
                  Uh oh! There seems to be an issue with the create:
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

            <AuthInput
              name={"name"}
              label={"Name"}
              type={"text"}
              placeholder={"Happy"}
              autocomplete={"given-name"}
              path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />


            <div class="flex items-center">
              <input
                id="1"
                type="radio"
                value="1"
                name="mood_type_id"
                class="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 focus:ring-violet-500"
                bind:group={selectedMoodType}
              />
              <label
                for="1"
                class="{selectedMoodType === '1' ? 'ms-1 text-sm font-medium selected-label' : 'ms-1 text-sm font-medium'}"
                >Positive</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="2"
                type="radio"
                value="2"
                name="mood_type_id"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                bind:group={selectedMoodType}
              />
              <label
                for="2"
                class="{selectedMoodType === '2' ? 'ms-1 text-sm font-medium selected-label' : 'ms-1 text-sm font-medium'}"
                >Neutral</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="3"
                type="radio"
                value="3"
                name="mood_type_id"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                bind:group={selectedMoodType}
              />
              <label
                for="3"
                class="{selectedMoodType === '3' ? 'ms-1 text-sm font-medium selected-label' : 'ms-1 text-sm font-medium'}"
                >Negative</label
              >
            </div>

            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/moods/my-mood"
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                style="background-color: #B4B4B4">Cancel</a
              >
              <button
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                type="submit"
                style="background-color: #9B9DD1">Create</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<BottomMenu imgPath="../" displayMoodText="1" />
