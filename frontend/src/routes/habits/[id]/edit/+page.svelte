<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').ActionData} */
	export let form;

    export let data;

    onMount(() => {
        function addNulIfNeeded(event) {
            if (event.target.value >= 0 && event.target.value <= 9) {
                event.target.value = `0${event.target.value}`;
            }
        }

        const start_time_minutes = document.getElementById('start_time_minutes');
        const start_time_hours = document.getElementById('start_time_hours');
        const duration_seconds = document.getElementById('duration_seconds');

        start_time_minutes.addEventListener('change', addNulIfNeeded);
        start_time_hours.addEventListener('change', addNulIfNeeded);
        duration_seconds.addEventListener('change', addNulIfNeeded);
    });
</script>

<form method="POST" class="text-black text-2xl" action="?/editHabit">
    {#if form && form.errors}
        <div class="bg-red-200 text-red-900 p-2 rounded">
            <p class="text-sm pb-2">
            Uh oh! There seems to be an issue with the edit:
            </p>
            <ul class="text-sm">
            {#each form?.errors as error}
                {#if error.message}
                <li class="error">* {error.message}</li>
                {/if}
            {/each}
            </ul>
        </div>
    {/if}
    <div>
        <label for="name">Name</label>
        <input id="name" placeholder="e.g. Brush teeth" name="name" class="rounded-sm" value={data.name}>
    </div>

    <div>
        <label for="start_time">Start time</label>
        <div class="flex">
            <input type="number" min="0" max="23" id="start_time_hours" name="start_time_hours" value={data.start_time_hours} class="rounded-sm">
            <p>:</p>
            <input type="number" min="0" max="59" id="start_time_minutes" name="start_time_minutes" value={data.start_time_minutes} class="rounded-sm">
        </div>
    </div>

    <div>
        <label for="duration">Duration</label>
        <div class="flex">
            <input type="number" min="0" max="90" id="duration_minutes" value={data.duration_minutes} name="duration_minutes" class="rounded-sm">
            <p>:</p>
            <input type="number" min="0" max="59" id="duration_seconds" value={data.duration_seconds} name="duration_seconds" class="rounded-sm">
        </div>
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Submit</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>