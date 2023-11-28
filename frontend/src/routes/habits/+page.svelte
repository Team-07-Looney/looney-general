<script>
    import HabitsList from "../../lib/components/HabitsList.svelte";
    import Heading from "../../lib/components/Heading.svelte";

    // Data contains all data passed by the page server
    export let data;
</script>

<Heading title="Habits" route="main" displayBackButton=1/>

<ul style="overflow-y: scroll; height:305px;">
  {#each data.habits as habit}
    <li class="px-10 py-2">
      <HabitsList title={habit.name} time={habit.start_time} iconCount={habit.id%4} habitId={habit.id}/>
    </li> 
  {/each}
</ul>

<!-- <a class="p-1.5 bg-red-400 rounded-lg mt-3" href={`${data.habit[0].id}/edit`}>Edit</a>
<form class="w-full bg-red-400 rounded-lg p-1" method="POST" action="?/deleteHabit">
    <button type="submit">Delete</button>
</form>-->

<div class="flex justify-center items-center">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10"></a>
</div>
