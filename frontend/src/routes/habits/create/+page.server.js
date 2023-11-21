export const actions = {
    createHabit: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("New habit");
        console.log(data);
        console.log(JSON.stringify({
            name: data.get("name"),
            start_time: data.get("start_time"),
            duration: data.get("duration")
        }));
        fetch(`http://localhost:3011/habits`, {
            method: "POST",
            body: JSON.stringify({
                name: data.get("name"),
                start_time: data.get("start_time"),
                duration: parseInt(data.get("duration"))
            })
        }).then((res) => {
            const response = res.json();
            console.log(response);
        });
    }
};