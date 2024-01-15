<script>
  export let buttonName;
  export let buttonIcon;
  export let buttonLink;
</script>

<a href={buttonLink}>
  <div
    class="bg-white rounded-xl w-[160px] h-[160px] flex flex-col gap-4
    px-4 py-4 items-center shadow-2xl hover:bg-accent"
    style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
  >
    <img src="/src/img/{buttonIcon}" alt="octopus" class="h-[85px] w-[90px]" />
    <h1 class=" text-2xl font-semibold">{buttonName}</h1>
  </div>
</a>
