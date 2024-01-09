<script>
    import { fly } from "svelte/transition";
</script>


<div in:fly={{x:100, duration: 600}} out:fly={{x:300, duration:600}} class="fixed z-[9] flex flex-row items-center">
    <img src="/src/img/tag.png" alt="tag" class="h-[80px]">
    <div class="bg-accent rounded-xl w-[300px] h-[120px] flex flex-row gap-4 px-5 items-center shadow-2xl" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
        <img src="/src/img/thoughtsOctopus.png" alt="octopus" class="h-[85px] w-[90px]" />
        <p>Connect your Looney to the application</p>
    </div>
</div>