<script>
    import Heading from "../../../lib/components/Heading.svelte";

    export let data;
</script>

<Heading title="Habits" route="habits" displayBackButton=1/>

<ul>
    <li class="px-10 py-2 ">
        <div class="bg-white rounded-xl shadow-2xl">
            <h1 class="p-1 rounded-lg mt-2 text-2xl"><strong>{data.habit[0].name}</strong></h1>
            <p class="p-1 rounded-lg mt-2">Start time {data.habit[0].start_time}</p>
            <p class="p-1 rounded-lg mt-2">{data.habit[0].duration}</p>
        </div>
    </li> 
</ul>


<a class="p-1.5 bg-blue-400 rounded-lg mt-3" href="">Start</a>
