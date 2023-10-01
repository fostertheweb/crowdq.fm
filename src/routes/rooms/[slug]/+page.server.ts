import { kv } from '$lib/kv';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const room = await kv.hgetall(`rooms:${params.slug}`);

	if (!room) {
		throw redirect(301, '/404');
	}

	return {
		isHost: locals.user.id === room.hostId,
		user: locals.user,
		room
	};
}
