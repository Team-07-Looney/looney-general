<script>
    import { getContext, onDestroy, onMount } from "svelte";
    import L from 'leaflet';

    export let title;
    export let body;

    let popup;
    let popupElement;

    let open = false;

    const { getLayer } = getContext('layer');
    const layer = getLayer();

    onMount(() => {
        popup = L.popup({ minWidth: 200, maxWidth: 400 }).setContent(popupElement);

        if (layer) {
            layer.bindPopup(popup);
            layer.on('popupopen', () => (open = true));
            layer.on('popupclose', () => (open = false));
        }
    });

    onDestroy(() => {
        layer?.unbindPopup();
        popup?.remove();
        popup = undefined;
    });
</script>

<div bind:this={popupElement} style="padding: 0; max-height: 150px; overflow: auto; font-family: Nunito; margin-right: 0;">
    {#if open}
    <div class="flex flex-col gap-2">
        <p class="text-2xl fixed top-0 bg-white" style="margin: 0; width: 79%;">{title}</p>
        <p class="bg-accent rounded-lg top-2 p-2 mb-0" style="margin-bottom: 1px; margin-left: 0.5px; ">
            {body}
        </p>
    </div>
    {/if}
</div>