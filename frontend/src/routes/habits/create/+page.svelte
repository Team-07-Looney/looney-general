<form method="POST" class="text-black text-2xl" action="?/createHabit">
    <div>
        <label for="name">Name</label>
        <input id="name" name="name" class="rounded-sm">
    </div>

    <div>
        <label for="start_time">Start time</label>
        <input id="start_time" name="start_time" class="rounded-sm">
    </div>

    <div>
        <label for="duration">Duration</label>
        <input id="duration" name="duration" class="rounded-sm">
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Create</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>
