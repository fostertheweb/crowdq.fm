import { createStore } from 'tinybase/cjs';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';

import type { Track } from '@spotify/web-api-ts-sdk';
import type PartySocket from 'partysocket';

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
		position: { type: 'number' },
		listenerId: { type: 'string' }
	},
	listeners: {
		displayName: { type: 'string' },
		avatar: { type: 'string' },
		isHost: { type: 'boolean', default: false }
	}
});

export async function createDatabase(partySocket: PartySocket) {
	const persister = createPartyKitPersister(store, partySocket, 'http');

	await persister.startAutoSave();
	await persister.startAutoLoad();
}

export function createQueueItem(track: Track) {
	return {
		name: track.name,
		album: track.album.name,
		artists: track.artists.map((artist) => artist.name).join(', '),
		artwork: track.album.images[0].url,
		duration: track.duration_ms,
		explicit: track.explicit,
		provider: 'spotify',
		providerId: track.id,
		addedAt: Date.now()
	};
}
