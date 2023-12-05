<script>
  import { onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { linear as easing } from 'svelte/easing';

 
  export let countdown;
 
  let now = Date.now();
  let end = now + countdown * 1000;
  let interval;
  let isPaused;
  let isResetting;
  let isOver;
  let isStarted = false
  const duration = 1000;

  $: count = Math.round((end - now) / 1000);
  $: h = Math.floor(count / 3600);
  $: m = Math.floor((count - h * 3600) / 60);
  $: s = count - h * 3600 - m * 60;
   
  function updateTimer() {
    now = Date.now(); 
  }
 
  $: if (count === 0){
    clearInterval(interval);
    isOver = true;
  } ;
 
  let offset = tweened(1, { duration, easing });
  let rotation = tweened(360, { duration, easing });
 
  $: offset.set(Math.max(count - 1, 0) / countdown);
  $: rotation.set((Math.max(count - 1, 0) / countdown) * 360);
 
  function handleStart() {
    now = Date.now();
    end = now + count * 1000;
    interval = setInterval(updateTimer, 1000);
    offset.set(Math.max(count - 1, 0) / countdown);
    rotation.set((Math.max(count - 1, 0) / countdown) * 360);
    isPaused = false;
    isStarted = true
  }
 
  function handlePause() {
    offset.set(count / countdown);
    rotation.set((count / countdown) * 360);
    clearInterval(interval);
    isPaused = true;
  }
 
  function handleReset() {
    clearInterval(interval);
    isResetting = true;
    isPaused = false;
    isOver = false;
    isStarted = true;
    Promise.all([offset.set(1), rotation.set(360)]).then(() => {
      isResetting = false;
      now = Date.now();
      end = now + countdown * 1000;
      interval = setInterval(updateTimer, 1000);
    });
  }
 
  // Converts the numbers to show them correctly
  function padValue(value, length = 2, char = '0') {
    const { length: currentLength } = value.toString();
    if (currentLength >= length) return value.toString();
    return `${char.repeat(length - currentLength)}${value}`;
  }
 
  onDestroy(() => {
    clearInterval(interval);
  });
</script>
 
<div class="flex flex-col justify-center items-center mt-4">
  <div class="flex flex-row">
  <svg viewBox="-50 -50 100 100" width="150" height="150">
    <title>{count}</title>
    <g fill="none" stroke="currentColor" stroke-width="8">
      <circle stroke="currentColor" r="46" />
      <path
        stroke="hsl(208, 100%, 50%)"
        d="M 0 -46 a 46 46 0 0 0 0 92 46 46 0 0 0 0 -92"
        pathLength="1"
        stroke-dasharray="1"
        stroke-dashoffset={isStarted ? $offset : '0'}
      />
    </g>
    <g fill="hsl(208, 100%, 50%)" stroke="none">
      <g transform="rotate({isStarted ? $rotation : '0'})">
        <g transform="translate(0 -46)">
          <circle r="4" />
        </g>
      </g>
    </g>
 
    <g
      fill="currentColor"
      text-anchor="middle"
      dominant-baseline="baseline"
      font-size="20"
    >
      <text x="-3" y="6.5">
        {#each Object.entries({ h, m, s }) as [key, value], i}
          {#if countdown >= 60 ** (2 - i)}
            <tspan dx="3" font-weight="bold">{padValue(value)}</tspan><tspan
              dx="0.5"
              font-size="10">{key}</tspan
            >
          {/if}
        {/each}
      </text>
    </g>
  </svg>
  </div>

  <!-- Buttons need to be refactor code duplicatio with the stop -->
  <div class="flex flex-row justify-center items-center mb-4 mt-6">
    {#if !isStarted}
      <button on:click={handleStart} class="bg-blue-500 rounded-lg p-2 text-white min-w-[85px]">Start</button>  
    {:else if isOver}
      <button on:click={handleReset} class="bg-gray-300 rounded-lg p-2 text-black min-w-[85px]">Reset</button>
    {:else if !isPaused}
      <button on:click={handlePause} class="bg-gray-300 rounded-lg p-2 text-black min-w-[85px] mr-2">Pause</button>
      <button class="bg-blue-500 rounded-lg p-2 text-white min-w-[85px] ml-2"><a href="/habits">Stop</a></button> 
    {:else}
      <button on:click={handleStart} class="bg-gray-300 rounded-lg p-2 text-black min-w-[85px] mr-2">Resume</button>
      <button class="bg-blue-500 rounded-lg p-2 text-white min-w-[85px] ml-2"><a href="/habits">Stop</a></button>   
    {/if}
  </div>
</div>