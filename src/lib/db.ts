import { createStore, type Table } from 'tinybase/cjs';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';

import type { Track, UserProfile } from '@fostertheweb/spotify-web-sdk';
import type PartySocket from 'partysocket';
import type { Listener, QueueItem } from './types';
import { convertISO8601ToMs, type YouTubeVideo } from './youtube';

export const store = createStore();

store.setTablesSchema({
	items: {
		name: { type: 'string' },
		album: { type: 'string' },
		artists: { type: 'string' },
		artwork: { type: 'string' },
		duration: { type: 'number' },
		provider: { type: 'string' },
		providerId: { type: 'string' },
		addedAt: { type: 'number' },
		addedBy: { type: 'string' },
		position: { type: 'number' }
	},
	listeners: {
		providerId: { type: 'string' },
		displayName: { type: 'string' },
		avatar: { type: 'string' },
		isHost: { type: 'boolean', default: false }
	}
});

export async function createDatabase(partySocket: PartySocket) {
	const protocol = window.location.protocol.slice(0, -1) as 'http' | 'https';
	const persister = createPartyKitPersister(store, partySocket, protocol);

	await persister.startAutoSave();
	await persister.startAutoLoad();
}

export function itemsTableToCollection(table: Table) {
	return Object.entries(table).map(([id, item]) => {
		return { id, ...item } as QueueItem;
	});
}

export function listenersTableToCollection(table: Table) {
	const entries = Object.entries(table);
	const rows = entries.map(([id, listener]) => {
		return { id, ...listener } as Listener;
	});

	return rows;
}

export function createQueueItemFromVideo(video: YouTubeVideo, listenerId: string) {
	return {
		name: video.snippet.title,
		artwork: video.snippet.thumbnails.default.url,
		duration: convertISO8601ToMs(video.contentDetails.duration),
		provider: 'youtube',
		providerId: video.id,
		addedAt: Date.now(),
		addedBy: listenerId
	};
}

export function createQueueItemFromTrack(track: Track, listenerId: string) {
	return {
		name: track.name,
		album: track.album.name,
		artists: track.artists.map((artist) => artist.name).join(', '),
		artwork: track.album.images[0].url,
		duration: track.duration_ms,
		explicit: track.explicit,
		provider: 'spotify',
		providerId: track.id,
		addedAt: Date.now(),
		addedBy: listenerId
	};
}

export function createUser(profile: UserProfile, isHost: boolean) {
	return {
		providerId: profile.id,
		displayName: profile.display_name,
		avatar: profile.images[0].url,
		isHost
	};
}
