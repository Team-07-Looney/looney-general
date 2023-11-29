<script>
	import OctopusButton from "../../lib/components/OctopusButton.svelte";
	import Header from "../../lib/components/Header.svelte";
</script>

<Header header="Looney"/>
<div class="flex flex-col">
	<div class="flex flex-row">
		<OctopusButton buttonName='Habits' buttonIcon='habitOctopus.png' buttonLink="/habits"/>
		<OctopusButton buttonName='Moods' buttonIcon='moodOctopus.png' buttonLink="/habits"/>
	</div>
</div>
<div class="bg-red-300 rounded-lg place-self-center">		
	<a href="/habits" type="button" class="p-1.5 bg-red-400 rounded-lg">Habits</a>
</div>