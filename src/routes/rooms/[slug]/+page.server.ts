import { getSession } from '$lib/auth';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('cq-session');

	if (!sessionId) {
		return null;
	}

	const session = await getSession(sessionId);

	if (!session) {
		return null;
	}

	return session;
};
