import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	// default: async (event) => {
	// 	// TODO log the user in
    //     const formData = await event.request.formData();
    //     const email = formData.get('email');
    //     const password = formData.get('password');
    //     console.log(email, password);
	// }
    login: async ({request,  cookies }) => {
        console.log("login");
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email, password);
        cookies.set('sessionid', email as string, { path: '/' });
    },
    register: async (event) => {
        console.log("register");
        redirect(302, '/');
    }
} satisfies Actions;