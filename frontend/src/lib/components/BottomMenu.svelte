<script>
    export let imgPath;
    export let displayHabitText = 0;
    export let displayHomeText = 0;
    export let displayMoodText = 0;
</script>

<div class="bg-white h-16 bottom-0 w-full absolute flex flex-row justify-between items-center px-10">
    <div class="flex flex-col items-center">
        <a href="/habits" type="button"><img src="{imgPath}../src/img/habitIcon.png" alt="habits" class="h-8"></a>
        {#if displayHabitText}
        <p>Habits</p>
        {/if}
    </div>
    <div class="flex flex-col items-center">
        <a href="/home" type="button"><img src="{imgPath}../src/img/homeIcon.png" alt="home" class="h-8"></a>
        {#if displayHomeText}
        <p>Home</p>
        {/if}
    </div>
    <div class="flex flex-col items-center">
        <a href="/moods" type="button"><img src="{imgPath}../src/img/moodIcon.png" alt="moods" class="h-8"></a>
        {#if displayMoodText}
        <p>Moods</p>
        {/if}
    </div>
</div>

<style>
    p {
        font-weight: bold;
        color: #909FF4;
    }
</style>