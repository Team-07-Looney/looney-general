<script>
    import Header from "../../../lib/components/Header.svelte";
    import Timer from "../../../lib/components/Timer.svelte";
    export let data;

 

  let countdown;
</script>

<Header title="Habits" route="habits" displayBackButton=1 displayMenu=0 path=""/>

<ul>
    <li class="px-10 py-2 ">
        <div class="bg-white rounded-xl shadow-2xl">
            <div class="flex justify-center">
                <div class="">
                    <img src="../../../src/img/icon{data.habit[0].id % 4}.png" style="height: 70px;" class="p-2"/>
                </div>
                <div class="pr-6">
                    <h1 class="p-1 rounded-lg mt-2 text-2xl underline underline-offset-8"><strong>{data.habit[0].name}</strong></h1>
                    <p class="rounded-lg text-center">Start time {data.habit[0].start_time}</p>
                </div>
            </div>

            <div>
               <Timer countdown={data.habit[0].duration} />
            </div>   
        </div>
    </li> 
</ul>


