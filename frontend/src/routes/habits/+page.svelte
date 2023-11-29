<script>
    import { setContext } from "svelte";
    import HabitsList from "../../lib/components/HabitsList.svelte";
    import Heading from "../../lib/components/Heading.svelte";

    // Data contains all data passed by the page server
    export let data;
</script>

<Heading title="Habits" route="main" displayBackButton=1/>

<ul style="overflow-y: scroll; height:305px;">
  {#each data.habits as habit}
    <li class="px-10 py-2">
      <HabitsList title={habit.name} time={habit.start_time} iconCount={habit.id%4} habitId={habit.id} />
    </li> 
  {/each}
</ul>

<div class="flex justify-center items-center">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10"></a>
</div>