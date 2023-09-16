import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const body = await request.json();

	cookies.set('cq-session', JSON.stringify(body), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	});

	return json(body);
}
