<script>
    import Button from '../../lib/components/Button.svelte';
    export let title;
    export let time;
    export let iconCount;
    export let habitId;
 
	let menuOpen = false;

</script>

<div class="bg-white rounded-xl shadow-2xl p-1">
    <a href={`habits/${habitId}`}>
        <div class="flex">
            <div class="">
                <img src="../../src/img/icon{iconCount}.png" style="height: 50px;" class="p-2"/>
            </div>
            <div class="">
                <h1 class="text-lg"><strong>{title}</strong></h1>
                <p>Start time {time}</p>
            </div>
        </div>
    </a>
   
    <section class="dropdown">
        <Button on:click={() => menuOpen = !menuOpen} {menuOpen} />
        <div id="myDropdown" class:show={menuOpen} class="dropdown-content">		
            <!-- MENU -->
          <a class="p-1.5 bg-red-400 rounded-lg mt-3" href={`habits/${habitId}/edit`}>Edit</a>
<form class="w-full bg-red-400 rounded-lg p-1" method="POST" action={`/habits/${habitId}?/deleteHabit`}>
    <button type="submit">Delete</button>
</form>
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
</div>
