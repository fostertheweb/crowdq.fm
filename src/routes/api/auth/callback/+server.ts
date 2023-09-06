import { redirect } from '@sveltejs/kit';
import { createSession } from '$lib/auth';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
	console.log({ url });
	const { searchParams } = new URL(url);
	const code = searchParams.get('code');
	const redirectUri = `${url.origin}/api/auth/callback`;

	if (!code) {
		throw redirect(304, '/login');
	}

	const session = await createSession(code, redirectUri);

	cookies.set('cq-session', session.id, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax'
	});

	const room = cookies.get('cq-room');

	if (room) {
		throw redirect(307, `/rooms/${room}`);
	}

	throw redirect(307, '/lobby');
};
