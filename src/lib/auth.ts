import { createClient } from '@vercel/kv';
import { buildSpotifyHeaders } from '$lib/spotify';
import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';
import {
	KV_REST_API_TOKEN,
	KV_REST_API_URL,
	SPOTIFY_CLIENT_SECRET as clientSecret
} from '$env/static/private';

import type { PrivateUser as SpotifyUser } from 'spotify-types';

const kv = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

const AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token';
const API_ENDPOINT = 'https://api.spotify.com/v1';

type SpotifyCredentials = {
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export type Session = SpotifyCredentials & {
	id: string;
	user: SpotifyUser;
};

function createAuthHeaders() {
	const authStringBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
	const headers = new Headers();
	headers.append('Authorization', `Basic ${authStringBase64}`);
	headers.append('Content-Type', 'application/x-www-form-urlencoded');

	return headers;
}

export async function getSpotifyUser(accessToken: string) {
	const headers = buildSpotifyHeaders(accessToken);
	const response = await fetch(`${API_ENDPOINT}/me`, {
		headers
	});

	return await response.json();
}

export async function refreshSession(refreshToken: string) {
	const headers = createAuthHeaders();
	const body = new URLSearchParams();
	body.append('grant_type', 'refresh_token');
	body.append('refresh_token', refreshToken);

	const response = await fetch(AUTH_ENDPOINT, {
		method: 'POST',
		headers,
		body
	});

	const { access_token, expires_in } = await response.json();
	const sessionId = String(await kv.incr('sessions'));
	const credentials = {
		access_token,
		refresh_token: refreshToken,
		expires_at: expires_in * 1000 + Date.now()
	};

	await kv.hset(`session:${sessionId}`, credentials);

	const user = await getSpotifyUser(access_token);

	return {
		id: sessionId,
		...credentials,
		user
	} as Session;
}

export async function createSession(code: string, redirectUri: string) {
	const headers = createAuthHeaders();
	const body = new URLSearchParams();
	body.append('grant_type', 'authorization_code');
	body.append('code', code);
	body.append('redirect_uri', redirectUri);
	const response = await fetch(AUTH_ENDPOINT, {
		method: 'POST',
		headers,
		body
	});

	console.log({ code, redirectUri, response });

	const { access_token, refresh_token, expires_in } = await response.json();
	const sessionId = String(await kv.incr('sessions'));

	console.log({ sessionId });

	const credentials = {
		access_token,
		refresh_token,
		expires_at: expires_in * 1000 + Date.now()
	};

	console.log({ credentials });

	await kv.hset(`session:${sessionId}`, credentials);

	const user = await getSpotifyUser(access_token);

	return {
		id: sessionId,
		...credentials,
		user
	};
}

export async function getSession(id: string) {
	const credentials = await kv.hgetall<SpotifyCredentials>(`session:${id}`);

	if (!credentials) {
		return null;
	}

	const user = await getSpotifyUser(credentials.access_token);

	console.log({ user });

	return {
		id,
		...credentials,
		user
	} as Session;
}

export function validateSession(session: Session): boolean {
	const now = Date.now();

	if (session.expires_at <= now) {
		return false;
	}

	return true;
}

export function invalidateSession() {
	console.log('Not Implemented');
}
