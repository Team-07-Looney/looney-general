<script>
  import "../app.postcss";
    import CoralCluster from "../lib/components/CoralCluster.svelte";
	import showElement from '$lib/showElement';
	
</script>

<div class="container min-h-screen mx-auto">
	<div class="w-screen h-screen bg-[url('/src/img/background.png')] bg-cover" style="font-family: 'Montserrat">
		<slot />
		{#if $showElement}
			<CoralCluster/>
		{/if}
	</div>
</div>
