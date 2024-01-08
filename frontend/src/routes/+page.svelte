<script>
	  import showElement from '$lib/showElement'
    import WhiteBanner from '../lib/components/WhiteBanner.svelte';
	  $showElement = true;
</script>

<div>
	<WhiteBanner title="Looney" description="Please Login or Register" displayMenuButton=0/>
	<div class=" mt-32 flex flex-col justify-center items-center text-center">
		<div>
			<a href="/login" type="button" class="bg-white rounded-lg shadow-lg text-lg min-w-[200px] p-2 flex-row m-2">
				Login
			</a>
		</div>
		
		<div>
			<a href="/register" type="button" class="bg-white rounded-lg shadow-lg text-lg min-w-[200px] p-2 flex-row m-2">
				Register
			</a>
		</div>
	</div>
</div>

		
	

