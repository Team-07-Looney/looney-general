<script>
    export let title;
    export let time;
    export let iconCount;
    export let habitId;
</script>

<div class="bg-white rounded-xl shadow-2xl p-1">
    <a href={`habits/${habitId}`}>
        <div class="flex">
            <div class="">
                <img src="../../src/img/icon{iconCount}.png" style="height: 50px;" class="p-2"/>
            </div>
            <div class="">
                <h1 class="text-lg"><strong>{title}</strong></h1>
                <p>Start time {time}</p>
            </div>
        </div>
    </a>
    <!--it should be a dropdwon that says delete of edit <a href={`habits/create`}>...</a>-->
</div>
