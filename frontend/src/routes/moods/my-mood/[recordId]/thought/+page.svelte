<script>
  import { onMount } from "svelte";
  import WhiteBanner from "../../../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";
  $showElement = false;

  /** @type {import('./$types').ActionData} */
  export let form;
  export let data;
  let latitude;
  let longitude;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storePosition);
    } else {
      onMount(() => {
        const locationCheckbox = document.getElementById("location");
        locationCheckbox.checked = false;
      });
    }
  }

  function storePosition(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  $showElement = false;
</script>

<svelte:head>
  <title>Write Thought</title>
</svelte:head>

<WhiteBanner
  title="My Mood"
  description="Gain more insight in how you are feeling, Looney will always be there"
  imgExtraPath="../../"
  route="/moods/my-mood"
  displayBackButton="1"
/>

<div
  class="bg-white z-20 mt-2 p-3 mr-6 ml-6 rounded-lg
  min-h-fit flex flex-col justify-center items-center shadow-lg"
>
  <div class="flex justify-center items-center flex-col">
    <h2 class="text-xl text-center">
      Would you like to write something about it?
    </h2>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <form method="POST" action="?/createThought" class="w-full">
      <label for="title">Title:</label>
      <input
        type="text"
        class="bg-[#EDEDED] p-2 w-full rounded-lg"
        name="title"
        value={form?.title ?? ""}
      />
      <label for="body">Story:</label>
      <textarea
        type="text"
        name="body"
        value={form?.body ?? ""}
        class="bg-[#EDEDED] w-full p-4 rounded-lg"
        rows="{form && form.errors?"2":"5"}"
      ></textarea>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="flex gap-1 items-center justify-center"
        on:click={getLocation}
      >
        <input type="checkbox" name="location" id="location" class="w-4 h-4" />
        <label for="location">Share with everybody on the map</label>
        <input class="hidden" id="latitude" name="latitude" value={latitude} />
        <input
          class="hidden"
          id="longitude"
          name="longitude"
          value={longitude}
        />
      </div>
      {#if form && form.errors}
        <div class="bg-red-200 bg-opacity-60 text-red-800 p-4 rounded-lg">
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
      <div class="flex flex-row gap-8 justify-center items-center mt-2">
        <a
          class="z-10 flex justify-center items-center bg-neutral-400
        text-white font-bold p-2 rounded-lg w-20"
          href="/moods/my-mood/{data.recordId}/thought/advice">Skip</a
        >
        <button
          class="z-10 bg-indigo-300 text-white font-bold p-2 rounded-lg w-20"
          type="submit">Submit</button
        >
      </div>
    </form>
  </div>
</div>

<BottomMenu imgPath="../../" displayMoodText="1" />
