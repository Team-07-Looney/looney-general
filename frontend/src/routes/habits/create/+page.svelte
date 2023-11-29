<script>
<<<<<<< HEAD
    import Header from "../../../lib/components/Header.svelte";
</script>

<Header header="Add Habit"/>
=======
    /** @type {import('./$types').ActionData} */
	export let form;
</script>

>>>>>>> feature/crud-for-habits
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
        <label for="start_time">Start time</label>
        <input id="start_time" placeholder="e.g. 10:00" name="start_time" value={form?.startTime ?? ''} class="rounded-sm">
    </div>

    <div>
        <label for="duration">Duration (seconds)</label>
        <input type="number" placeholder="e.g. 120" min="0" id="duration" value={form?.duration ?? ''} name="duration" class="rounded-sm">
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Create</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>
