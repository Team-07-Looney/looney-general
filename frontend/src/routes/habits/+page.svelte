<script>
    export let data;
    console.log(data.habits.data);
</script>

<ul class="text-black text-3xl">
    {#each data.habits.data as habit}
        <li>{habit.name}</li> 
    {/each}
</ul>