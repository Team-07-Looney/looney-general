<script>
  import AuthInput from "../../../../lib/components/AuthInput.svelte";
  import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";
  import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
  import ShadowsForForms from "../../../../lib/components/ShadowsForForms.svelte";
  import FormEars from "../../../../lib/components/FormEars.svelte";
  $showElement = false;
  /** @type {import('./$types').ActionData} */
  export let form;
  let selectedMoodType = ""; // Variable to track the selected mood type
</script>

<svelte:head>
  <title>Create Mood</title>
</svelte:head>

<WhiteBanner
  title="Add Mood"
  description="Add a mood that fits your emotions"
  displayBackButton="0"
  imgExtraPath="../"
  displayMenuButton="1"
/>
<div class="flex justify-center items-center mt-20">
  <div class="flex flex-col items-center">
    <FormEars />
    <div class="grid grid-cols-1">
      <ShadowsForForms height={250} width={250} />
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
              label={"Name of emotion"}
              type={"text"}
              placeholder={"Happy"}
              autocomplete={"given-name"}
              path={"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />

            <div class="flex flex-row gap-6 justify-center items-center">
              <div class="flex items-center justify-center">
                <label
                  for="1"
                  class="justify-center items-center flex flex-col
                  {selectedMoodType === "1"
                    ? "text-sm font-medium selected-label"
                    : "text-sm font-medium"}"
                >
                  <input
                    id="1"
                    type="radio"
                    value="1"
                    name="mood_type_id"
                    bind:group={selectedMoodType}
                  />
                  <div class="flex flex-col items-center p-1">
                    <img
                      src="/src/img/happy.png"
                      alt="Happy heart"
                      class="w-12 h-12"
                    />
                  </div>
                  Positive
                </label>
              </div>

              <div class="flex items-center justify-center">
                <label
                  for="2"
                  class="justify-center items-center flex flex-col
                  {selectedMoodType === "2"
                    ? "text-sm font-medium selected-label"
                    : "text-sm font-medium"}"
                >
                  <input
                    id="2"
                    type="radio"
                    value="2"
                    name="mood_type_id"
                    bind:group={selectedMoodType}
                  />
                  <div class="flex flex-col items-center p-1">
                    <img
                      src="/src/img/neutral.png"
                      alt="Neutral heart"
                      class="w-12 h-12"
                    />
                  </div>
                  Neutral
                </label>
              </div>

              <div class="flex justify-center items-center">
                <label
                  for="3"
                  class="justify-center items-center flex flex-col {selectedMoodType ===
                  "3"
                    ? "text-sm font-medium selected-label"
                    : "text-sm font-medium"}"
                >
                  <input
                    id="3"
                    type="radio"
                    value="3"
                    name="mood_type_id"
                    bind:group={selectedMoodType}
                  />
                  <div class="flex flex-col items-center p-1">
                    <img
                      src="/src/img/sad.png"
                      alt="Sad heart"
                      class="w-12 h-12"
                    />
                  </div>
                  Negative
                </label>
              </div>
            </div>

            <div class="flex flex-row gap-8 justify-center items-center">
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

<style>
  .selected-label {
    font-weight: bold;
  }

  [type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  [type="radio"] + div {
    cursor: pointer;
  }

  [type="radio"]:checked + div {
    background-color: rgb(239 246 255);
    border-width: 2px;
    border-color: rgb(191 219 254);
    border-radius: 0.75rem;
  }
</style>
