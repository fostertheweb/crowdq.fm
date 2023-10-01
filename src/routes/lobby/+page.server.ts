import { kv } from '$lib/kv';
import ShortUniqueId from 'short-unique-id';

import type { Room } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	return {
		user: locals.user
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
