<script>
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { onDestroy, onMount, setContext } from 'svelte';

    export let bounds;
    export let view;
    export let zoom;

    let map;
    let mapElement;

    onMount(() => {
        map = L.map(mapElement);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext('map', {
        getMap: () => map
    });

    $: if (map) {
        if (bounds) {
            map.fitBounds(bounds);
        } else if (view && zoom) {
            map.setView(view, zoom);
        }
    }
</script>

<div class="h-full w-full" bind:this={mapElement}>
    {#if map}
        <slot />
    {/if}
</div>