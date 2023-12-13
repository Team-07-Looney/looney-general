<script>
  import "../app.postcss";
    import CoralCluster from "../lib/components/CoralCluster.svelte";
</script>

<div class="container min-h-screen mx-auto">
	<div class="w-screen h-screen bg-[url('/src/img/background.png')] bg-cover" style="font-family: Nunito">
		<slot />
	</div>
</div>
