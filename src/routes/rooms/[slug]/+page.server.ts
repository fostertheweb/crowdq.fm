import { kv } from '$lib/kv';
import { redirect } from '@sveltejs/kit';

import type { Room } from '$lib/types';

export async function load({ locals, params }) {
	const room = await kv.hgetall<Room>(`rooms:${params.slug}`);
	let isHost = false;

	if (!room) {
		throw redirect(301, '/404');
	}

	if (locals.user?.id) {
		isHost = locals.user.id === room.hostId;
	}

	return {
		isHost,
		user: locals.user,
		room
	};
}
