<script>
  import Timer from "../../../../../lib/components/Timer.svelte";
  import WhiteBanner from "../../../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../../../lib/components/BottomMenu.svelte";
  import showElement from "$lib/showElement";

  export let data;
  $showElement = false;
</script>

<WhiteBanner
  title={data.habit[0].name}
  description="Start it, pause it, resume it, cancel it! No shame of doing so!"
  route="/categories/{data.habit[0].category_id}/habits"
  displayBackButton="1"
  imgExtraPath="../../../"
/>
<ul class="mt-2 z-50 relative">
  <li class="px-10 py-2">
    <div
      class="bg-white rounded-xl h-[22rem] mt-8 flex flex-col justify-center items-center pt-3"
      style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
    >
      <p class="text-lg font-semibold">Start time {data.habit[0].start_time}</p>
      <Timer
        bind:countdown={data.habit[0].duration}
        categoryId={data.habit[0].category_id}
        habitId={data.habit[0].id}
      />
    </div>
  </li>
</ul>
<BottomMenu imgPath="../../" displayHabitText="1" />
