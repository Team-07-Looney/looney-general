<script>
  // Data contains all data passed by the page server
  export let data;
  console.log(data);
</script>

<ul class="text-black text-3xl">
  {#each data.habits as habit}
    <li>{habit.name}</li>
  {/each}
</ul>
<a href="/" type="button" class="p-1.5 bg-red-400 rounded-lg">
    Home 
</a>
<a href="/" type="button" class="p-1.5 bg-red-400 rounded-lg">
    Back button 
</a>
<a class="p-1.5 bg-red-400 rounded-lg" href="/habits/create">Create habit</a>
