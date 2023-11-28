<script>
    import Habit from "../../lib/components/Habit.svelte";

    // Data contains all data passed by the page server
    export let data;
</script>


<a href="/main" type="button" class="p-1.5"><img src="../src/img/backButton.png" style="height: 50px;"></a>
<a href="/" type="button" class="p-2" style="float: right;"><img src="../src/img/menuButton.png" class="h-10"></a>
<h1 class="text-center text-8xl text-black font-chewy">Habits</h1>

<ul style="overflow-y: scroll; height:300px;">
  {#each data.habits as habit}
    <li class="px-10 py-2"><a href={`habits/${habit.id}`}>
      <Habit title={habit.name} time={habit.start_time} iconCount={habit.id%4}/></a>
    </li> 
  {/each}
</ul>

<div class="flex justify-center items-center">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10"></a>
</div>
