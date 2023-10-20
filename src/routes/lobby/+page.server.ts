import { kv } from '$lib/kv';
import { redirect } from '@sveltejs/kit';
import ShortUniqueId from 'short-unique-id';

import type { Room } from '$lib/types';

export async function load({ cookies, locals }) {
	const room = cookies.get('cq-room');

	return {
		user: locals.user,
		room
	};
}

export const actions = {
	async default({ cookies, locals }) {
		const createSlug = new ShortUniqueId();
		const slug = createSlug();
		const room: Room = {
			slug,
			imageUrl: locals.user.images[0].url,
			hostId: locals.user.id,
			hostedBy: locals.user.display_name
		};

		await kv.hset(`rooms:${slug}`, room);

		cookies.set('cq-room', slug, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax'
		});

		throw redirect(303, `/rooms/${slug}`);
	}
};
