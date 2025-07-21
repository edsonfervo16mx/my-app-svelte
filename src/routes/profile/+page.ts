import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ fetch }) => {
    console.log("Loading users...");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return {
        users: data,
    };
});