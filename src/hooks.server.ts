import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

	if (event.url.pathname.startsWith('/lobby')) {
		if (event.cookies.get('cq-refresh')) {
			return resolve(event);
		}

		throw redirect(304, new URL('/login', event.url.origin).toString());
	}

	return resolve(event);
}