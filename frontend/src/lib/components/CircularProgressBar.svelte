<script>
  export let progress = 0; // Progress value between 0 and 100
  const radius = 30; // Adjust the radius as needed
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
</script>

<style>
  .progress-ring {
    fill: transparent;
    stroke: rgb(72, 78, 114); /* Change the color as needed */
    stroke-width: 10;
  }

  .progress-ring__circle {
    stroke-dasharray: circumference;
    stroke-dashoffset: offset;
    transition: stroke-dashoffset 0.3s;
  }
</style>

<svg class="progress-ring flex flex-col min-w-min" height="80" width="80">
  <circle
    class="progress-ring__circle"
    stroke-linecap="round"
    cx="40"
    cy="40"
    r={radius}
  />
</svg>
