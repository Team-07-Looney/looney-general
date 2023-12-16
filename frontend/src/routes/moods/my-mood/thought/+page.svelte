<script>
    import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
</script>

<WhiteBanner
    title="My Mood"
    description="Gain more insight in how you are feeling, Looney will always be there
"
    imgExtraPath="../"
/>

<div
    class="bg-white z-20 mt-1 p-3 mr-6 ml-6 rounded-lg min-h-fit flex flex-col justify-center items-center shadow-lg"
>
    <div class="flex justify-center items-center flex-col">
        <h2 class="text-xl text-center">
            Would you like to write something about it?
        </h2>
        <form method="POST" action="?/createThought" class="w-full">
            <label>Title:</label>
            <input
                type="text"
                class="bg-gray-300 p-2 w-full rounded-lg"
                name="title"
            />
            <label>Story:</label>
            <textarea type="text" class="bg-gray-300 w-full p-4 rounded-lg"
            ></textarea>
            <div class="flex flex-row gap-8 justify-center items-center mt-2">
                <a
                    class="z-10 flex justify-center items-center bg-neutral-400 text-white font-bold p-2 rounded-lg w-20"
                    href="/moods">Skip</a
                >
                <button
                    class="z-10 bg-indigo-300 text-white font-bold p-2 rounded-lg w-20"
                    type="submit">Submit</button
                >
            </div>
        </form>
    </div>
</div>
