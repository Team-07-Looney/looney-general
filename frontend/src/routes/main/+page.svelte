<script>
	import OctopusButton from "../../lib/components/OctopusButton.svelte";
	import Header from "../../lib/components/Header.svelte";
    import CoralCluster from "../../lib/components/CoralCluster.svelte";

	export let data;
</script>

<Header title="Looney" displayMenu=1 />
<div class="flex flex-col justify-center items-center gap-8 mt-20">
	<div class="flex flex-row justify-center items-center">
		<OctopusButton buttonName='Habits' buttonIcon='habitOctopus.png' buttonLink="/habits"/>
		<OctopusButton buttonName='Moods' buttonIcon='moodOctopus.png' />
	</div>
	<div>
		<p class="text-2xl">Hello, {data.username}</p>
	</div>
</div>

<CoralCluster />