import { redirect } from '@sveltejs/kit';
import { createServerClient } from '$lib/spotify';

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/login')) {
		event.cookies.delete('cq-room');
	}

	const cookie = event.cookies.get('cq-session');

	if (cookie) {
		const credentials = JSON.parse(cookie);

		if (credentials) {
			if (Date.now() >= credentials.expires) {
				console.log('Hooks: Session Expired');
				event.cookies.delete('cq-session', { path: '/' });

				return await resolve(event);
			}

			console.log('Hooks: Create Client');
			const client = createServerClient(credentials);
			event.locals.user = await client.currentUser.profile();
		}
	} else {
		if (event.url.pathname.startsWith('/lobby') && !event.url.search.includes('code')) {
			throw redirect(302, '/login');
		}

		console.log('Hooks: No Cookie Resolve');
		return await resolve(event);
	}

	console.log('Hooks: Fallback Resolve');
	return await resolve(event);
}
