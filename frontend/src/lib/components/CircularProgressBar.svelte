<script>
	export let progress
	const angle = 360 * progress
	
	// Adapt the logic according to the approach
	const	background = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, gainsboro ${angle}deg 360deg),
    conic-gradient(#9b9DD1 0deg, #9b9DD1);`;
	
	$: cssVarStyles = `--background:${background}`
</script>

<style>
#progress-circle {
  background: var(--background);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  transition: all 500ms ease-in;
  will-change: transform;
}
</style>

<div id="progress-circle" style="{cssVarStyles}"></div>
