<script>
  import BottomMenu from "../../lib/components/BottomMenu.svelte";
  import OctopusButton from "../../lib/components/OctopusButton.svelte";
  import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
  import showElement from "$lib/showElement";
  import BuyLooney from "../../lib/components/BuyLooney.svelte";
  import { onMount } from "svelte";

  export let data;
  $showElement = true;
  let tagIsOpen;
  let tagButton = 1;

  function toggleTag() {
    tagIsOpen = !tagIsOpen;
    tagButton = 0;
  }

  function toggleButton() {
    toggleTag();
    tagButton = 1;
  }

  onMount(() => {
    const closeTag = () => {
      tagIsOpen = false;
    };

    return closeTag;
  });
</script>

<WhiteBanner
  title="Hi, {data.user.checkedUsername}!"
  description="How can I help you today? Anything on your mind?"
  route="/"
  imgExtraPath="../"
/>

<div class="absolute bottom-24 right-0 opacity-{tagButton}">
  <button on:click={toggleTag}>
    <img src="/src/img/tag.png" alt="tag" class=" h-24" /></button
  >
</div>

<div class="mt-7 flex justify-center items-center">
  <div class="flex flex-col justify-center items-center gap-4 mb-10">
    <div class="flex flex-col gap-6">
      <OctopusButton
        buttonName="My Habits"
        buttonIcon="habits.png"
        buttonLink="/categories"
        buttonDescription="Add new ones, check the old ones, Looney is going to be with you"
      />
      <OctopusButton
        buttonName="My Moods"
        buttonIcon="myMoods.png"
        buttonLink="/moods"
        buttonDescription="Gain more insight in how you are feeling, Looney will always be there"
      />
      {#if tagIsOpen}
        <button on:click={toggleButton}>
          <BuyLooney />
        </button>
      {/if}
    </div>
  </div>
</div>

<BottomMenu imgPath="../" displayHomeText="1" />
