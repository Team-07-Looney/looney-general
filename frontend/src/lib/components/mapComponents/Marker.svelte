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
            const markerIcon = L.icon({
                iconUrl: './src/img/location.png',

                iconSize: [38, 38],
                iconAnchor: [20, 40],
                popupAnchor: [0, -30],
            });

            marker = L.marker(latLng, { icon: markerIcon }).addTo(map);
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