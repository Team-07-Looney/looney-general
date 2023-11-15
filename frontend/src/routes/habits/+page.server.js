export const load = async (serverLoadEvent) => {
    try {
        const {fetch} = serverLoadEvent;
        const res = await fetch(`http://localhost:3011/habits`);
        const habits = await res.json();
        console.log(habits);
        return {habits};
    }
    catch (error) {
        return {
            error,
        };
    }
};