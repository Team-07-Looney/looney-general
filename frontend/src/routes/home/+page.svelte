<script>
	import BottomMenu from "../../lib/components/BottomMenu.svelte";
	import OctopusButton from "../../lib/components/OctopusButton.svelte";
	import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
	import showElement from "$lib/showElement";
	import BuyLooney from "../../lib/components/BuyLooney.svelte";
	$showElement = true;

	import { onMount } from "svelte";
	let tagIsOpen;
	let tagButton = 1;
	function toggleTag() {
		tagIsOpen = !tagIsOpen;
		tagButton = 0;
	}

	onMount(() => {
		const closeTag = () => {
			tagIsOpen = false;
		};

		return closeTag;
	});
</script>

<WhiteBanner
	title="Hi, Balint!"
	description="How can I help you today? Anything on your mind?"
	route="/"
	imgExtraPath="../"
/>

<div class="mt-7 flex justify-center items-center">
	<div class="flex flex-col justify-center items-center gap-4 mb-10">
		<div class="flex flex-col gap-6">
			<OctopusButton
				buttonName="My Habits"
				buttonIcon="habitOctopus.png"
				buttonLink="/categories"
				buttonDescription="Add new ones, check the old ones, Looney is going to be with you"
			/>
			<OctopusButton
				buttonName="My Moods"
				buttonIcon="moodOctopus.png"
				buttonLink="/moods"
				buttonDescription="Gain more insight in how you are feeling, Looney will always be there"
			/>
		</div>
	</div>
</div>
<div class="absolute right-0 opacity-{tagButton}">
	<button on:click={toggleTag}> <img src="/src/img/tag.png" alt="tag" class="h-28"></button>
</div>

{#if tagIsOpen}
	<BuyLooney/>
{/if}

<BottomMenu imgPath="../" displayHomeText="1" />
