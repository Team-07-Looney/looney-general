<script>
    import { onDestroy } from 'svelte';
  
    export let duration;
  
    let elapsed = 0;
    let last_time = window.performance.now();
    let frame;
  
    function startTimer() {
      frame = requestAnimationFrame(update);
    }
  
    function update() {
      const time = window.performance.now();
      elapsed -= Math.min(time - last_time, duration - elapsed);
      last_time = time;
  
      frame = requestAnimationFrame(update);
    }
  
    onDestroy(() => {
      cancelAnimationFrame(frame);
    });
  </script>
  
  <label>
    Timer:
    <svg height="100" width="100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#00796b"
        stroke-width="3"
        fill="transparent"
        style="transition: stroke-dashoffset 0.3s ease"
        stroke-dasharray="283"
        stroke-dashoffset={(elapsed / duration)}
      />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em">{Math.floor(elapsed / 1000)}s</text>
    </svg>
  </label>

  
  <button on:click={startTimer}>Start</button>
  <button on:click={() => (elapsed = 0)}>Reset</button>
  <button on:click={() => (elapsed = 0, cancelAnimationFrame(frame))}>Stop</button>
  