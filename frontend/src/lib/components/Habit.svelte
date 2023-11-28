<script>
    export let title;
    export let time;
    export let iconCount;
</script>
<div class="bg-white rounded-xl shadow-2xl flex p-1">
    <div>
        <img src="../../src/img/icon{iconCount}.png" style="height: 50px;" class="p-2">
    </div>
    <div>
        <h1 class="text-lg"><strong>{title}</strong></h1>
        <p>Start time {time}</p>
    </div>
    <div style="float: left;">
        <a href="">...</a>
    </div>
</div>