<script>
    export let buttonName;
    export let buttonIcon;
    export let buttonLink;
</script>

<a href="{buttonLink}">
<div class="bg-white rounded-xl w-[150px] h-[150px] flex flex-col gap-3 justify-center items-center shadow-2xl" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
        <img src="/src/img/{buttonIcon}" alt="octopus" class="h-[85px]">
        <h1 class=" text-2xl font-semibold">{buttonName}</h1>
</div>
</a>
