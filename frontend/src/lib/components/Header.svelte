<script>
    export let title;
    export let route;
    export let displayBackButton;
</script>

<a href="/{route}" type="button" class="p-1.5 opacity-{displayBackButton}"><img src="../src/img/backButton.png" style="height: 50px;"></a>
<a href="" type="button" class="p-2" style="float: right;"><img src="../src/img/menuButton.png" class="h-10"></a>
<h1 class="text-center text-7xl font-chewy outline-4 text-white">{title}</h1>
<h1 class="text-center text-7xl text-transparent font-chewy absolute inset-x-0 top-10" style="-webkit-text-stroke-width: 3px; -webkit-text-stroke-color: black; padding-top:24px" >{title}</h1>
