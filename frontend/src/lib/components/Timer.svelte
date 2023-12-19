  <script>
    import { onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { linear as easing } from 'svelte/easing';

    // Duration of the timer
    export let countdown;
    export let categoryId;
    export let habitId;

    let now = Date.now();
    let end = now + countdown * 1000;
    let interval;
    let isPaused;
    let isResetting;
    
    // Checks whether the timer count reaches 0
    let isOver;
    let isStarted = false;
    const duration = 1000;

    // Initializing the animation of the circle
    let offset = tweened(0, { duration, easing });
    let rotation = tweened(0, { duration, easing });

    // Keeps thee values of count, h = hours, m = minutes and s= seconds updated
    $: count = Math.round((end - now) / 1000);
    $: h = Math.floor(count / 3600);
    $: m = Math.floor((count - h * 3600) / 60);
    $: s = count - h * 3600 - m * 60;

    function updateTimer() {
      now = Date.now();
      const remaining = Math.max(end - now, 0);
      const progress = (countdown - remaining / 1000) / countdown;

      offset.set(progress);
      rotation.set(progress * 360);

      if (remaining === 0) {
        clearInterval(interval);
        isOver = true;
      }
    }

    onDestroy(() => {
      clearInterval(interval);
    });

    // Handles the start and resume
    function handleStart() {
      now = Date.now();
      if (!isStarted) {
        end = now + (countdown - 1) * 1000;
      } else {
        end = now + count * 1000;
      }
      interval = setInterval(updateTimer, 1000);
      isPaused = false;
      isStarted = true;
    }

    function handlePause() {
      clearInterval(interval);
      isPaused = true;
    }

    function handleReset() {
      clearInterval(interval);
      isResetting = true;
      isPaused = false;
      isOver = false;
      isStarted = true;

      // Resets the animation, updates the state and starts the timer
      Promise.all([offset.set(0), rotation.set(0)]).then(() => {
        isResetting = false;
        now = Date.now();
        end = now + countdown * 1000;
        interval = setInterval(updateTimer, 1000);
      });
    }

    function padValue(value, length = 2, char = '0') {
      const { length: currentLength } = value.toString();
      if (currentLength >= length) return value.toString();
      return `${char.repeat(length - currentLength)}${value}`;
    }
  </script>

  <div class="flex flex-col justify-center items-center mt-4">
    <div class="flex flex-row">
      <svg viewBox="-60 -60 120 120" width="180" height="180">
        <title>{count}</title>
        <g fill="none" stroke="purple" stroke-width="9">
          <circle stroke="purple" r="46" />
          <path stroke="gray" d="M 0 -46 a 46 46 0 0 0 0 92 46 46 0 0 0 0 -92" pathLength="1" stroke-dasharray="1" stroke-dashoffset={$offset} />
        </g>
        <g fill="purple" stroke="none">
          <g transform="rotate({$rotation})">
            <g transform="translate(0 -46)">
              <circle r="4" />
            </g>
          </g>
        </g>

        <g fill="black" text-anchor="middle" dominant-baseline="baseline" font-size="20">
          <text x="-3" y="6.5">
            {#each Object.entries({ h, m, s }) as [key, value], i}
              {#if countdown >= 60 ** (2 - i)}
                <tspan dx="3" font-weight="bold">{padValue(value)}</tspan><tspan dx="0.5" font-size="10">{key}</tspan>
              {/if}
            {/each}
          </text>
        </g>
      </svg>
    </div>

    <div class="flex flex-row justify-center items-center mb-4 mt-6">
      {#if !isStarted}
        <button on:click={handleStart} class="bg-[#383e4d] rounded-lg p-2 text-white min-w-[85px]">Start</button>  
      {:else}
        {#if isOver}
        <button on:click={handleReset} class="rounded-lg p-2 min-w-[85px] mr-2 bg-indigo-200 border-black">Reset</button>
        {:else if !isPaused}
          <button on:click={handlePause} class="bg-gray-300 rounded-lg p-2 text-black min-w-[85px] mr-2">Pause</button>
        {:else}
          <button on:click={handleStart} class="bg-gray-300 rounded-lg p-2 text-black min-w-[85px] mr-2">Resume</button>
        {/if}
        <form method="POST" action={`/categories/${categoryId}/habits/${habitId}?/createRecord`}>
          <button type="submit" class="bg-[#383e4d] rounded-lg p-2 text-white min-w-[85px] ml-2">Done</button>
        </form>
      {/if}
    </div>
  </div>
  