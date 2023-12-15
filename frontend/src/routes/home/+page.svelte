<script>
	import OctopusButton from "../../lib/components/OctopusButton.svelte";
	import Header from "../../lib/components/Header.svelte";
    import OverviewItem from "../../lib/components/mainPageComponents/OverviewItem.svelte";
</script>

<Header title="Looney" />
<div class=" mt-2 flex justify-center items-center">
	<div class="flex flex-col justify-center items-center gap-4 mb-10">
		<div class="flex flex-row gap-7">
			<OctopusButton buttonName='Habits' buttonIcon='habitOctopus.png' buttonLink="/categories"/>
			<OctopusButton buttonName='Moods' buttonIcon='moodOctopus.png' buttonLink='/moods'/>
		</div>
		<div class="bg-white w-full rounded-xl shadow-2xl px-5 py-4 text-center justify-center items-center" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
			<p class="text-2xl font-semibold">Overview</p>
			<div class="flex flex-col gap-3 mt-2">
				<OverviewItem icon="sad"/>
				<OverviewItem icon="neutral"/>
				<OverviewItem icon="happy"/>
			</div>
		</div>
	</div>
</div>
