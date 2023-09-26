import { TinyBasePartyKitServer } from 'tinybase/persisters/persister-partykit-server';

export default class extends TinyBasePartyKitServer {
	async onStart() {
		// no need to call super.onStart()
		console.log('Server started');
	}

	async onMessage(message, client) {
		await super.onMessage(message, client);
		// custom onMessage code
	}

	async onRequest(request) {
		// custom onRequest code, else:
		return await super.onRequest(request);
	}
}
