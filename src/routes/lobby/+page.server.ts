import { createClient } from '@vercel/kv';
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';
import ShortUniqueId from 'short-unique-id';

import type { Room } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	return {
		user: locals.user
	};
}

const kv = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

export const actions = {
	async default({ cookies, locals }) {
		const createSlug = new ShortUniqueId();
		const slug = createSlug();
		const room: Room = {
			slug,
			imageUrl: locals.user.images[0].url,
			hostedBy: locals.user.display_name
		};

		await kv.hset(`rooms:${slug}`, room);

		cookies.set('cq-room', slug);

		throw redirect(303, `/rooms/${slug}`);
	}
};
