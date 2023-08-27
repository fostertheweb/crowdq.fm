import ShortUniqueId from "short-unique-id";
import type { Listener, Room } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const user = {}
    const { roomType } = await request.json();

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
        isHost: true,
        room: slug,
        provider: "spotify",
        providerId: user.id,
        avatar: user.images[0].url,
        displayName: user.display_name,
    };

    return json({ host, room });
}