<script>
    import Timer from "../../../../../lib/components/Timer.svelte";
    import { tweened } from 'svelte/motion';
    import WhiteBanner from "../../../../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../../../../lib/components/BottomMenu.svelte";
    export let data; 
    import showElement from '$lib/showElement';

$showElement = false;
</script>

<WhiteBanner
title="Habit"
description="Start it, pause it, resume it, cancel it!
No shame of doing so!"
route="/categories/{data.habit[0].category_id}/habits"
displayBackButton="1"
imgExtraPath="../../../"
/>
<ul class="mt-2 z-50 relative">
    <li class="px-10 py-2">
        <div class="bg-white rounded-xl" style="box-shadow: rgba(0, 0, 0, 0.50) 0px 25px 50px -12px">
            <div class="flex justify-center">
                <div class="">
                    <img src="../../../src/img/icon{data.habit[0].id % 4}.png" style="height: 70px;" class="p-2" alt="icon"/>
                </div>
                <div class="pr-6">
                    <h1 class="p-1 rounded-lg mt-2 text-2xl underline underline-offset-8"><strong>{data.habit[0].name}</strong></h1>
                    <p class="rounded-lg text-center">Start time {data.habit[0].start_time}</p>
                </div>
            </div>

            <div>
               <Timer bind:countdown={data.habit[0].duration} categoryId={data.habit[0].category_id} habitId={data.habit[0].id} />
            </div>
        </div>
    </li> 
</ul>
<BottomMenu imgPath="../../" displayHabitText="1" />