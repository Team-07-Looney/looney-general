<script>
    import Header from "../../../lib/components/Header.svelte";



</script>

<Header title="My mood" displayBackButton="1" displayMenu="1" route="/moods"/>
<div class="bg-white mt-24 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center">
<div class="flex flex-row">
    <h2 class="text-xl"> 
        How do you feel today?
    </h2>

</div>
<div class="flex flex-row">
    <h2 class="text-xl"> 
        Why do you feel this way?
    </h2>
</div>
<div class="flex flex-row">
<button class="bg-neutral-400 text-white font-bold p-2 rounded-lg w-20">Cancel</button>
<button class="bg-indigo-300 text-white font-bold p-2 rounded-lg w-20">Next</button>
</div>
</div>