<script>
	import OctopusButton from "../../lib/components/OctopusButton.svelte";
	import Header from "../../lib/components/Header.svelte";
    import CoralCluster from "../../lib/components/CoralCluster.svelte";
</script>

<Header title="Looney" displayMenu=1 />
<div class="flex flex-col mt-20">
	<div class="flex flex-row justify-center items-center">
		<OctopusButton buttonName='Habits' buttonIcon='habitOctopus.png' buttonLink="/habits"/>
		<OctopusButton buttonName='Moods' buttonIcon='moodOctopus.png' />
	</div>
</div>

<CoralCluster />