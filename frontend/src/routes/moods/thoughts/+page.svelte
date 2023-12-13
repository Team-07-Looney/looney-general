<script>
    import BottomMenu from '../../../lib/components/BottomMenu.svelte';
   import WhiteBanner from '../../../lib/components/WhiteBanner.svelte';
   // Data contains all data passed by the page server
   export let data;
   console.log(data);
</script>

<WhiteBanner title="My Thoughts"
             description="Vent out your feelings and look back at them to see your personal growth"
             route="/moods"
             displayBackButton=1
             imgExtraPath = "../"/>

<BottomMenu imgPath="../" displayMoodText=1/>
