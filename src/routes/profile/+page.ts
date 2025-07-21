import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ data, fetch }) => {
    console.log("Loading users...");

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const payload = await res.json();
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return {
        users: payload,
        data_test: data.data_test,
    };
});