<script>
	import "../app.postcss";
</script>

<div class="container min-h-screen mx-auto">
	<div
		class="relative bg-cover object-scale-down bg-center h-screen"
		style="background-image: url('/src/img/background-main.png');"
	/>
	<div
	class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 grid grid-cols-1 gap-16"
	>
		<slot />
	</div>
</div>
