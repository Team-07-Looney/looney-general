<script>
  import { onMount, onDestroy } from "svelte";

  export let duration;

  let elapsed = 0;
  let frame;
function startTimer() {
      frame = requestAnimationFrame(update);
    }
  onMount(() => {
    let last_time = window.performance.now();
    

    function update() {
      const time = window.performance.now();
      elapsed -= Math.min(time - last_time, duration - elapsed);
      last_time = time;

      frame = requestAnimationFrame(update);
    }

    onDestroy(() => {
      cancelAnimationFrame(frame);
    });

  });

  
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

<svg height="200" width="200">
  <circle
    cx="100"
    cy="100"
    r="45"
    stroke="#9b9dd1"
    stroke-width="15"
    fill="transparent"
    style="transition: stroke-dashoffset 0.3s ease"
    stroke-dasharray="283"
    stroke-dashoffset={elapsed / duration}
  />
  <text x="50%" y="50%" text-anchor="middle" dy=".3em"
    >{Math.floor(elapsed / 1000)}s</text
  >
</svg>

<button on:click={startTimer}>Start</button>
<button on:click={() => (elapsed = 0)}>Reset</button>
<button on:click={() => ((elapsed = 0), cancelAnimationFrame(frame))}
  >Stop</button
>
