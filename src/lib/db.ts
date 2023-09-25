import { createStore } from 'tinybase/cjs';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';

import type PartySocket from 'partysocket';

export const store = createStore();

export async function createDatabase(partySocket: PartySocket) {
	const persister = createPartyKitPersister(store, partySocket);

	await persister.startAutoSave();
	await persister.startAutoLoad();
}
