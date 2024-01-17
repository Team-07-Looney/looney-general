<script>
    import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../lib/components/BottomMenu.svelte";
    import Leaflet from "../../lib/components/mapComponents/Leaflet.svelte";
    import Marker from "../../lib/components/mapComponents/Marker.svelte";
    import Popup from "../../lib/components/mapComponents/Popup.svelte";
    import showElement from "$lib/showElement";

    export let data;

    const initialView = data.userLocation;

    $showElement = false;
</script>
<svelte:head>
    <title>Map</title> 
</svelte:head>

<WhiteBanner
  title="My Map"
  description="Look at the map and read through other people’s vents! You are never alone"
  route="/moods"
  displayBackButton="1"
  imgExtraPath="../"
/>

<div
  class="bg-white mt-2 p-3 mr-6 ml-6 rounded-lg min-h-fit flex
   flex-col justify-center items-center shadow-lg h-4/6 overflow-y-scroll overflow-x-hidden"
>
    <p class="text-xl">You are <strong>not</strong> ALONE</p>
    <Leaflet view={initialView} zoom={data.mapZoom}>
        {#each data.thoughts as thought}
            <Marker latLng={thought.location}>
                <Popup title={thought.title} body={thought.body} />
            </Marker>
        {/each}
    </Leaflet>
</div>

<BottomMenu imgPath="../../../" displayMoodText="1" />
