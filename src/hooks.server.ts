import { redirect } from '@sveltejs/kit';
import { getSession, refreshSession, validateSession } from '$lib/auth';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/lobby')) {
		const sessionId = event.cookies.get('cq-session');

		if (sessionId) {
			let session = await getSession(sessionId);

			if (!session) {
				throw redirect(304, '/login');
			}

			if (!validateSession(session)) {
				session = await refreshSession(session.refresh_token);
			}

			// is locals even useful?
			event.locals.session = session;

			return resolve(event);
		}

		throw redirect(304, '/login');
	}

	return resolve(event);
};
