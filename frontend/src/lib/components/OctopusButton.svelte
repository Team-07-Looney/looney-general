<script>
  export let buttonName;
  export let buttonIcon;
  export let buttonLink;
  export let buttonDescription;
</script>

<a href={buttonLink}>
  <div
    class="bg-white rounded-xl w-[330px] h-[120px] flex
    flex-row gap-4 px-4 items-center shadow-2xl hover:bg-accent"
    style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
  >
    <img src="/src/img/{buttonIcon}" alt="octopus" class="h-[85px] w-[90px]" />
    <div class="flex flex-col">
      <h1 class=" text-2xl font-semibold">{buttonName}</h1>
      <p>{buttonDescription}</p>
    </div>
  </div>
</a>
