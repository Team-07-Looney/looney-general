<script>
    export let total;
    export let progress;
    export let icon;
    export let color;
    progress = Math.round((progress * 100) / total);
</script>
<div class="flex justify-center items-center">
    <img src="../../../../src/img/{icon}.png" alt="Icon emotion" class="object-scale-down h-8">
    <div class="ml-2 w-72 h-3 bg-gray-200 overflow-hidden rounded-lg">
        <div class="{color} rounded-lg h-full transition-width duration-500 ease-in-out"
        style="width: {progress}%;"></div>
    </div>
</div>
