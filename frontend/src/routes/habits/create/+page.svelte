<form method="POST" class="text-black text-2xl" action="?/createHabit">
    <div>
        <label for="name">Name</label>
        <input id="name" placeholder="e.g. Brush teeth" name="name" class="rounded-sm">
    </div>

    <div>
        <label for="start_time">Start time</label>
        <input id="start_time" placeholder="e.g. 10:00" name="start_time" class="rounded-sm">
    </div>

    <div>
        <label for="duration">Duration (seconds)</label>
        <input type="number" placeholder="e.g. 120" min="0" id="duration" name="duration" class="rounded-sm">
    </div>

    <button class="p-1.5 bg-red-400 rounded-lg mt-3" type="submit">Create</button>
    <a href="/habits" class="p-1.5 bg-blue-400 rounded-lg mt-3">Cancel</a>
</form>
