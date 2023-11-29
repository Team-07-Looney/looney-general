<script>
    import { setContext } from "svelte";
    import HabitsList from "../../lib/components/HabitsList.svelte";
    import Heading from "../../lib/components/Heading.svelte";

    // Data contains all data passed by the page server
    export let data;

    import Link from '../../lib/components/Link.svelte';
	import Button from '../../lib/components/Button.svelte';


	
	let menuOpen = false;


	
	const menuItems = ["About", "Base", "Blog", "Contact", "Custom", "Support", "Tools", "Boats", "Cars", "Bikes", "Sheds", "Billygoats", "Zebras", "Tennis Shoes", "New Zealand"];
	let filteredItems = [];
	
</script>

<Heading title="Habits" route="main" displayBackButton=1/>

<ul style="overflow-y: scroll; height:305px;">
  {#each data.habits as habit}
    <li class="px-10 py-2">
      <HabitsList title={habit.name} time={habit.start_time} iconCount={habit.id%4} habitId={habit.id}/>
    </li> 
  {/each}
</ul>


<div class="flex justify-center items-center">
<a class="p-2" href="/habits/create"><img src="../src/img/addButton.png" style="height: 50px;" class="h-10"></a>
</div>




<section class="dropdown">
  <Button on:click={() => menuOpen = !menuOpen} {menuOpen} />
	
  <div id="myDropdown" class:show={menuOpen} class="dropdown-content">		
  	
		<!-- MENU -->
		{#if filteredItems.length > 0}
			{#each filteredItems as item}
				<Link link={item} />
			{/each}
		{:else}
			{#each menuItems as item}
				<Link link={item} />
			{/each}
		{/if}		
  </div>	
</section>
	
	
<style>		
.dropdown {
  position: relative;
  display: inline-block;
}
	
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  border: 1px solid #ddd;
  z-index: 1;
}

/* Show the dropdown menu */	
.show {display:block;}	
</style>
