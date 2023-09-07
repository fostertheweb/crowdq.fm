import { getSession, refreshSession, validateSession } from '$lib/auth';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('cq-session');

	if (!sessionId) {
		return null;
	}

	let session = await getSession(sessionId);

	if (!session) {
		return null;
	}

	if (!validateSession(session)) {
		session = await refreshSession(session.refresh_token);
	}

	return session;
};
