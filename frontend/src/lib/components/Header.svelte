<script>
  export let title;
  export let route = "";
  export let displayBackButton = 0;
  export let displayMenu = 0;
  export let imgExtraPath = "";
</script>

<div class="bg-white min-h-[20%]">
  <a href={route} type="button" class="p-1.5 opacity-{displayBackButton}"
    ><img
      src="{imgExtraPath}../src/img/backButton.png"
      style="height: 50px; z-index: 20; position:absolute; margin-left: 5px"
      alt="back"
    /></a
  >
  <!--Menu Button functionality still needs to be implemented-->
  <a
    href="/"
    type="button"
    class="p-2 {displayMenu ? "" : "hidden"} absolute right-0 z-[20]">
      <img
        src="{imgExtraPath}../src/img/menuButton.png"
        class="h-10"
        alt="menu"
      />
    </a>
  <h1 class="text-4xl absolute inset-x-0 ml-3 top-20">{title}</h1>
</div>
