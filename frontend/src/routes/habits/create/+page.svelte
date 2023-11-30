<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').ActionData} */
	export let form;

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

<form method="POST" class="text-black text-2xl" action="?/createHabit">
    {#if form && form.errors}
        <div class="bg-red-200 text-red-900 p-2 rounded">
            <p class="text-sm pb-2">
            Uh oh! There seems to be an issue with the create:
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
        <input id="name" placeholder="e.g. Brush teeth" value={form?.name ?? ''} name="name" class="rounded-sm">
    </div>

    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Start time</label>
        <div class="flex">
            <input type="number" min="0" max="23" id="start_time_hours" name="start_time_hours" value={form?.startTimeHours ?? ''} class="rounded-sm">
            <p>:</p>
            <input type="number" min="0" max="59" id="start_time_minutes" name="start_time_minutes" value={form?.startTimeMinutes ?? ''} class="rounded-sm">
        </div>
    </div>

    <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Duration</label>
        <div class="flex">
            <input type="number" min="0" max="90" id="duration_minutes" value={form?.durationMinutes ?? ''} name="duration_minutes" class="rounded-sm">
            <p>:</p>
            <input type="number" min="0" max="59" id="duration_seconds" value={form?.durationSeconds ?? ''} name="duration_seconds" class="rounded-sm">
        </div>
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Create</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>
