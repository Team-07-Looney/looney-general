<script>
    export let title;
    export let date;
    export let iconType;
    export let thoughtId;
  
    let icon;
    console.log(iconType);
  
    if (iconType === "Negative") {
      icon = "sad";
    } else if (iconType === "Positive") {
      icon = "happy";
    } else {
      icon = "neutral";
    }
  
   // Define deleteThought function outside onMount
   async function deleteThought() {
    try {
      const response = await fetch(`http://localhost:3011/thoughts/${thoughtId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion, for example, navigate to a different page
        console.log('Thought deleted successfully');
      } else {
        // Handle deletion error
        console.error('Error deleting thought:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting thought:', error.message);
    }
  }
  </script>
  
  <div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <div>
      <img src={`../../src/img/${icon}.png`} alt="emotion" class="h-14">
    </div>
    <div class="flex flex-col">
      <p class="text-xl font-bold">{title}</p>
      <p>{date}</p>
    </div>
    <div class="pl-16">
      <button on:click={deleteThought}>
        <img src="../../src/img/trashIcon.png" alt="trash" class="h-8">
      </button>
    </div>
  </div>