import { json } from '@sveltejs/kit';
import { refreshSession } from '$lib/auth';

import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const { refresh_token } = await request.json();
	const session = await refreshSession(refresh_token);

	cookies.set('cq-session', session.id, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax'
	});

	return json(session);
};
