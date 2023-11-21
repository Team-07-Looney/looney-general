<script>
    export let data;
    console.log(data.habits.data);
</script>

<ul class="text-black text-3xl">
    {#each data.habits.data as habit}
        <li>{habit.name}</li> 
    {/each}
</ul>

<a class="p-1.5 bg-red-400 rounded-lg" href="/habits/create">Create habit</a>