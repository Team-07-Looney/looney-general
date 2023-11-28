<script>
    /** @type {import('./$types').ActionData} */
	export let form;

    export let data;
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
        <input id="name" placeholder="e.g. Brush teeth" name="name" class="rounded-sm" value={data.habit[0].name}>
    </div>

    <div>
        <label for="start_time">Start time</label>
        <input id="start_time" placeholder="e.g. 10:00" name="start_time" class="rounded-sm" value={data.habit[0].start_time}>
    </div>

    <div>
        <label for="duration">Duration</label>
        <input type="number" min="0" placeholder="e.g. 120" id="duration" name="duration" class="rounded-sm" value={data.habit[0].duration}>
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Submit</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>