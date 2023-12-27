<script>
export let title;
export let description;
export let route = "";
export let displayBackButton = 0;
export let displayMenuButton = 1;
export let imgExtraPath;
</script>

<div class="bg-white h-36 w-full pt-1">
<div class="flex flex-row justify-between items-center relative z-10 pr-3">
    <a href="{route}" type="button" class="p-1.5 opacity-{displayBackButton}"><img src="{imgExtraPath}../src/img/backButton.png" alt="back" class=" h-7"></a>
    <a href="/profile" type="button" class="p-1.5 opacity-{displayMenuButton}"><img src="{imgExtraPath}../src/img/menuButton.png" alt="menu" class="h-6"></a>
    
</div>
<div class=" pl-9 z-0 pb-6 relative">
    <p class="text-4xl font-extrabold">{title}</p>
    <p class=" pr-8">{description}</p>
</div>
</div>