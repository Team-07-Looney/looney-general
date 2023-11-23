<script>
    export let data;
</script>

<form method="POST" class="text-black text-2xl" action="?/editHabit">
    <div>
        <label for="name">Name</label>
        <input id="name" name="name" class="rounded-sm" value={data.habit[0].name}>
    </div>

    <div>
        <label for="start_time">Start time</label>
        <input id="start_time" name="start_time" class="rounded-sm" value={data.habit[0].start_time}>
    </div>

    <div>
        <label for="duration">Duration</label>
        <input id="duration" name="duration" class="rounded-sm" value={data.habit[0].duration}>
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Submit</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>