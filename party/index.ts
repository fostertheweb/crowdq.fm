import type * as Party from 'partykit/server';

export default class WebSocket implements Party.Server {
	constructor(readonly party: Party.Party) {}

	onStart() {
		console.log('Party server started');
	}

	onMessage(message, sender): void | Promise<void> {
		console.log('Received message from', sender.id, message);

		this.party.broadcast(message);
	}
}
