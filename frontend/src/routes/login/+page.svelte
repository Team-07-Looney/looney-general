<h1 class="text-center text-8xl text-black">Looney</h1>
<h1 class="text-center text-3xl text-black">Login</h1>
<div class="bg-red-300 py-5 px-5 rounded-lg place-self-center">
	<form method="POST" class="grid grid-cols-1 gap-8 text-gray-900" action='?/login'>
		<div>
			<label for="email" class="text-black text-2xl">Email</label>
			<input id="email" type="email" name="email" class="rounded-sm">
		</div>
		
		<div>
			<label for="password" class="text-black text-2xl">Password</label>
			<input id="password" type="password" name="password" class="rounded-sm">
		</div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Login</button>
	</form>
</div>
