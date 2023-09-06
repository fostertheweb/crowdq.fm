import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/auth';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('cq-session');

	if (!sessionId) {
		throw redirect(304, '/login');
	}

	const session = await getSession(sessionId);

	if (!session) {
		throw redirect(304, '/login');
	}

	return session;
};
