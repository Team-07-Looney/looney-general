<script>
  export let omitBg = 0;
  export let name;
  export let group;
</script>

<div class="flex flex-col {omitBg ? "bg-advice": "bg-accent"} rounded-lg shadow-lg p-1 w-1/2 text-center m-1" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
  <p class="font-semibold">{name}</p>
  <div class="flex justify-center max-h-12">
    <img src="../../../../src/img/adviceIcons/{name}.png"
    alt="advice" class="object-cover h-full mt-1">
  </div>
  <span class="align-text-bottom mt-2" >{group}</span>
</div>
