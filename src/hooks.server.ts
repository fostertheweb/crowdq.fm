import { createServerClient } from '$lib/spotify';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('cq-session');
	const credentials = cookie ? JSON.parse(cookie) : null;

	if (cookie && credentials) {
		if (Date.now() >= credentials.expires) {
			console.log('Hooks: Session Expired');
			event.cookies.delete('cq-session', { path: '/' });

			if (event.url.pathname.startsWith('/lobby')) {
				throw redirect(302, '/login');
			}

			return await resolve(event);
		}

		if (event.url.pathname.startsWith('/lobby')) {
			if (!event.url.search.includes('code')) {
				console.log('Hooks: Creating New Room');
				event.cookies.delete('cq-room', { path: '/' });
			}
		}

		if (event.url.pathname.startsWith('/login')) {
			// authenticating in the room will go directly to spotify
			event.cookies.delete('cq-room', { path: '/' });
		}

		console.log('Hooks: Create Client');
		const client = createServerClient(credentials);
		event.locals.user = await client.currentUser.profile();

		return await resolve(event);
	}

	if (event.url.pathname.startsWith('/lobby') && !event.url.search.includes('code')) {
		console.log('Hooks: No Session or Code Param');
		event.cookies.delete('cq-room', { path: '/' });
		throw redirect(302, '/login');
	}

	console.log('Hooks: Fallback Resolve');
	return await resolve(event);
}
