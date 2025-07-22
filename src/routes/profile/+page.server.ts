import type { PageServerLoad } from './$types';
import { config } from '$lib/config';

export const load: PageServerLoad = async ({cookies}) => {
    const sessionid = cookies.get('sessionid');
    console.log(sessionid);

    const credentials = btoa(`${config.BASIC_USERNAME_API}:${config.BASIC_PASSWORD_API}`);

    const response_test = await fetch(`${config.PUBLIC_API_BASE}/index.php?object=Colegio`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
	
    const data_test = await response_test.json();

    if (!response_test.ok) {
        throw new Error(`HTTP error! status: ${response_test.status}`);
    }

    return {
        data_test: data_test,
    };
};