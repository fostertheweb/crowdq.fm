import ShortUniqueId from "short-unique-id";
import type { Listener, Room } from '$lib/types';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { PrivateUser } from 'spotify-types'

export const POST: RequestHandler = async ({ request, locals}) => {
    const user: PrivateUser = locals.session.user;

    if (!user) {
        return new Response(null, { status: 401 });
    }

    const createSlug = new ShortUniqueId();
    const slug = createSlug();

    const room: Room = {
        slug,
        imageUrl: user.images[0].url,
        hostedBy: user.display_name,
    };

    const host: Listener = {
        id: user.id,
        isHost: true,
        room: slug,
        avatar: user.images[0].url,
        displayName: user.display_name,
    };

    return json({ host, room });
}