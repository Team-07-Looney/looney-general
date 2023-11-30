<script>
    export let buttonName;
    export let buttonIcon;
    export let buttonLink;
</script>

<a href="{buttonLink}">
<div class="bg-white rounded-xl w-[150px] h-[150px] flex flex-col gap-3 justify-center items-center">
        <img src="/src/img/{buttonIcon}" alt="octopus" class="h-[85px]">
        <h1 class=" text-2xl ">{buttonName}</h1>
</div>
</a>
