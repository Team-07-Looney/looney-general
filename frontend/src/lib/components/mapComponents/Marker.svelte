<script>
    import { getContext, onDestroy, onMount, setContext } from "svelte";
    import L from 'leaflet';

    export let width;
    export let height;
    export let latLng;

    let marker;
    let markerElement;

    const { getMap } = getContext('map');
    const map = getMap();

    setContext('layer', {
        getLayer: () => marker
    })

    onMount(() => {
        if (map) {
            console.log(marker);
            marker = L.marker(latLng).addTo(map);
        }
    });

    onDestroy(() => {
        marker?.remove();
        marker = undefined;
    });
</script>

<div bind:this={markerElement}>
    {#if marker}
        <slot />
    {/if}
</div>