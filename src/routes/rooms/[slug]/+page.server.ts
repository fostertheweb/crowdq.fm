import { redirect } from '@sveltejs/kit';
import { kv } from '$lib/kv';
import { createServerClient } from '$lib/spotify';

import type { Room } from '$lib/types';

export async function load({ cookies, locals, params }) {
	const room = await kv.hgetall<Room>(`rooms:${params.slug}`);
	let client;
	let isHost = false;
	let devices;

	if (!room) {
		throw redirect(301, '/404');
	}

	if (locals.user?.id) {
		isHost = locals.user.id === room.hostId;
	}

	const cookie = cookies.get('cq-session');

	if (cookie) {
		const session = JSON.parse(cookie);
		client = createServerClient(session);
		const response = await client.player.getAvailableDevices();
		devices = response.devices;
	}

	return {
		isHost,
		user: locals.user,
		devices,
		room
	};
}
