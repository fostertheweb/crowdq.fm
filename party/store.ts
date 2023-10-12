import { TinyBasePartyKitServer } from 'tinybase/persisters/persister-partykit-server';

export default class extends TinyBasePartyKitServer {
	async onStart() {
		console.log('Persistence server started');
	}

	async onMessage(message, client) {
		await super.onMessage(message, client);
	}

	async onRequest(request) {
		return await super.onRequest(request);
	}
}
