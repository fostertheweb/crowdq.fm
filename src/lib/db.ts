import PartySocket from 'partysocket';
import { createStore } from 'tinybase/cjs';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';

const PARTYKIT_HOST = '';

const store = createStore();

export async function createDatabase(slug: string) {
	const persister = createPartyKitPersister(
		store,
		new PartySocket({
			host: PARTYKIT_HOST,
			room: slug
		})
	);

	await persister.startAutoSave();
	await persister.startAutoLoad();
}
