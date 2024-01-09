<script>
    export let imgPath = "";
    export let displayHabitText = 0;
    export let displayHomeText = 0;
    export let displayMoodText = 0;
</script>

<div class="bg-white h-16 bottom-0 w-full absolute flex flex-row justify-between items-center px-10 z-50">
    <div class="flex flex-col items-center p-2 rounded-xl px-2 border-2 {displayHabitText ? "bg-blue-50 border-blue-200" : "border-white"}">
        <a href="/categories" type="button"><img src="{imgPath}../src/img/habitIcon.png" alt="habits" class="h-8"></a>
    </div>
    <div class="flex flex-col items-center p-2 rounded-xl px-2 border-2 {displayHomeText ? "bg-blue-50 border-blue-200" : "border-white"}">
        <a href="/home" type="button"><img src="{imgPath}../src/img/homeIcon.png" alt="home" class="h-8"></a>
    </div>
    <div class="flex flex-col items-center p-2 rounded-xl px-2 border-2 {displayMoodText ? "bg-blue-50 border-blue-200" : "border-white"}">
        <a href="/moods" type="button"><img src="{imgPath}../src/img/moodIcon.png" alt="moods" class="h-8"></a>
    </div>
</div>

<style>
    p {
        font-weight: bold;
        color: #909FF4;
    }
</style>