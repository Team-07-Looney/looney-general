<script>
    import { setContext } from "svelte";
    import HabitsList from "../../lib/components/HabitsList.svelte";
    import Header from "../../lib/components/Header.svelte";
    // Data contains all data passed by the page server
    export let data;
</script>

<Header title="Habits" route="main" displayBackButton=0/>

  <ul style="overflow-y: scroll; height:305px; margin-top: 110px; position:relative; z-index: 5">
    {#each data.habits as habit}
      <li class="px-10 py-2">
        <HabitsList title={habit.name} time={habit.start_time} iconCount={habit.id%4} habitId={habit.id} />
      </li> 
    {/each}
  </ul>


<div class="flex justify-center items-center relative" style="z-index: 10;">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10"></a>
</div>