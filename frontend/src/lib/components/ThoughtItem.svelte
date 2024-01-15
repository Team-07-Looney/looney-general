<script>
    export let title;
    export let date;
    export let iconType;
    export let thoughtId;
    let icon;
  
    if (iconType === "Negative") {
      icon = "sad";
    } else if (iconType === "Positive") {
      icon = "happy";
    } else {
      icon = "neutral";
    }
</script>
<div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center"
  style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
  <a href={`thoughts/${thoughtId}`} class="flex flex-row gap-4">
    <div>
      <img src={`../../src/img/${icon}.png`} alt="emotion" class="h-14">
    </div>
    <div class="flex flex-col">
      <p class="text-xl font-bold">{title}</p>
      <p>{date}</p>
    </div>
  </a>
  <div>
    <form class="w-full rounded-lg p-1" method="POST" action={`/moods/thoughts/${thoughtId}?/deleteThought`}>
      <button type="submit"><img src="../../src/img/trashIcon.png" alt="trash" class="h-8"></button>
    </form>
  </div>
</div>
