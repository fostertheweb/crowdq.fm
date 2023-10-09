import { redirect } from '@sveltejs/kit';
import { kv } from '$lib/kv';
import { createServerClient } from '$lib/spotify';

import type { Room } from '$lib/types';
import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';

export async function load({ cookies, locals, params }) {
	const room = await kv.hgetall<Room>(`rooms:${params.slug}`);
	let client;
	let isHost = false;
	let devices;
	let user: UserProfile | null = locals.user;

	if (!room) {
		throw redirect(301, '/404');
	}

	if (locals.user?.id) {
		isHost = locals.user.id === room.hostId;
	}

	cookies.set('cq-room', params.slug, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	});

	const cookie = cookies.get('cq-session');

	if (cookie) {
		const session = JSON.parse(cookie);
		client = createServerClient(session);
		user = await client.currentUser.profile();
		const response = await client.player.getAvailableDevices();
		devices = response.devices.filter(({ is_active }) => is_active);
	}

	return {
		isHost,
		user,
		devices,
		room
	};
}
