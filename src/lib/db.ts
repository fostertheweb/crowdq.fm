import { createStore, type Table } from 'tinybase/cjs';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';
import { NODE_ENV } from '$env/static/private';

import type { Track, UserProfile } from '@spotify/web-api-ts-sdk';
import type PartySocket from 'partysocket';
import type { QueueItem } from './types';

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
		id: { type: 'string' },
		displayName: { type: 'string' },
		avatar: { type: 'string' },
		isHost: { type: 'boolean', default: false }
	}
});

export async function createDatabase(partySocket: PartySocket) {
	const protocol = NODE_ENV === 'production' ? 'https' : 'http';
	const persister = createPartyKitPersister(store, partySocket, protocol);

	await persister.startAutoSave();
	await persister.startAutoLoad();
}

export function itemsTableToCollection(table: Table) {
	const rows = Object.entries(table).map(([id, item]) => {
		return { id, ...item } as QueueItem;
	});

	return rows;
}

export function createQueueItem(track: Track, listenerId: string) {
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
		id: profile.id,
		displayName: profile.display_name,
		avatar: profile.images[0].url,
		isHost
	};
}
