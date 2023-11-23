<script>
    export let data;
</script>

<ul class="text-black text-3xl">
    <li class="p-1 bg-red-400 rounded-lg mt-2">{data.habit[0].name}</li>
    <li class="p-1 bg-red-400 rounded-lg mt-2">{data.habit[0].start_time}</li>
    <li class="p-1 bg-red-400 rounded-lg mt-2">{data.habit[0].duration}</li>
</ul>

<a class="p-1.5 bg-red-400 rounded-lg mt-3" href={`${data.habit[0].id}/edit`}>Edit</a>
<a class="p-1.5 bg-blue-400 rounded-lg mt-3" href="/habits">Back</a>
