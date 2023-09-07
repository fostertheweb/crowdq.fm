import { getSession, refreshSession, validateSession } from '$lib/auth';

export async function load({ cookies }) {
	let session = null;
	const sessionId = cookies.get('cq-session');

	if (sessionId) {
		session = await getSession(sessionId);
	}

	if (session) {
		if (!validateSession(session)) {
			session = await refreshSession(session.refresh_token);
		}
	}

	return { isAuthenticated: session !== null, session };
}
