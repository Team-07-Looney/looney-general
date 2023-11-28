<script>
	import OctopusButton from "../../lib/components/octopusButton.svelte";
</script>

<h1 class="text-center text-8xl text-black font-chewy">Looney</h1>
<div class="flex flex-col">
	<div class="flex flex-row ">
		<div class="bg-white shadow-xl">
			<OctopusButton buttonName='Habits' buttonIcon='habitOctopus.png'/>
		</div>
	</div>
</div>
<div class="bg-red-300 rounded-lg place-self-center">		
	<a href="/habits" type="button" class="p-1.5 bg-red-400 rounded-lg">Habits</a>
</div>