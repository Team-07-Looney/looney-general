<script>
	import Header from "../lib/components/Header.svelte";
</script>

<Header header="Looney"/>
<div class="bg-red-300 py-5 px-5 rounded-lg place-self-center">
	<form class="grid grid-cols-1 gap-8">
		<div>
			<label for="name" class="text-black text-2xl">Name</label>
			<input id="name" name="name" class="rounded-sm">
		</div>
		
		<div>
			<label for="email" class="text-black text-2xl">Email</label>
			<input id="email" name="email" class="rounded-sm">
		</div>
		
		<div>
			<label for="password" class="text-black text-2xl">Password</label>
			<input id="password" name="password" class="rounded-sm">
		</div>
		<a href="/habits" type="button" class="p-1.5 bg-red-400 rounded-lg">
			Login
		</a>
	</form>
</div>
