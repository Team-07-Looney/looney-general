<script>
    export let title;
    export let route = "";
    export let displayBackButton = 0;
    export let displayMenu = 0;
    export let imgExtraPath = "";
</script>

<a href="{route}" type="button" class="p-1.5 opacity-{displayBackButton}"><img src="{imgExtraPath}../src/img/backButton.png" style="height: 50px; z-index: 20; position:absolute; margin-left: 5px" alt="back"></a>
<!--Menu Button functionality still needs to be implemented-->
<a href="" type="button" class="p-2 {displayMenu ? '' : 'hidden'} absolute right-0 z-[20]"><img src="{imgExtraPath}../src/img/menuButton.png" class="h-10" alt="menu"></a>
<h1 class="text-center text-7xl text-white font-chewy absolute inset-x-0 ml-1 top-[20px]">{title}</h1>
<h1 class="text-center text-7xl text-transparent font-chewy absolute inset-x-0 top-4" style="-webkit-text-stroke-width: 3px; -webkit-text-stroke-color: black;" >{title}</h1>