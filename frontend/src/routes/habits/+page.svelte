<script>
    import Habit from "../../lib/components/Habit.svelte";

    // Data contains all data passed by the page server
    export let data;
</script>


  <h1 class="text-center text-8xl text-black font-chewy">Habits</h1>

  <ul>
    {#each data.habits as habit}
      <li class="px-10 py-2"><a href={`habits/${habit.id}`}>
        <Habit title={habit.name} time={habit.start_time} iconCount={habit.id}/></a>
      </li> 
    {/each}
  </ul>

<a href="/" type="button" class="p-1.5 bg-red-400 rounded-lg">
    Home 
</a>
<a href="/" type="button" class="p-1.5 bg-red-400 rounded-lg">
    Back button 
</a>
<a class="p-1.5 bg-red-400 rounded-lg" href="/habits/create">Create habit</a>
