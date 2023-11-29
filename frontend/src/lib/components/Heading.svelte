<script>
    export let title;
    export let route;
    export let displayBackButton;
</script>

<a href="/{route}" type="button" class="p-1.5 opacity-{displayBackButton}"><img src="../src/img/backButton.png" style="height: 50px;"></a>
<a href="" type="button" class="p-2" style="float: right;"><img src="../src/img/menuButton.png" class="h-10"></a>
<!--<h1 class="text-center text-8xl font-chewy text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Habits</h1>-->
<h1 class="text-center text-8xl font-chewy outline-4 text-black">{title}</h1>