import type * as Party from 'partykit/server';

export default class WebSocket implements Party.Server {
	constructor(readonly party: Party.Party) {}

	onConnect(connection: Party.Connection<unknown>): void | Promise<void> {
		const message = { type: 'connect', id: connection.id };
		this.party.broadcast(JSON.stringify(message));

		console.log(message);
	}

	onClose(connection: Party.Connection<unknown>): void | Promise<void> {
		const message = { type: 'remove', table: 'listeners', id: connection.id };
		const connections = [...this.party.getConnections()];

		connections[0].send(JSON.stringify(message));

		console.log(message);
	}

	onMessage(message, sender): void | Promise<void> {
		const msg = { type: message, id: sender.id };

		this.party.broadcast(JSON.stringify(msg));

		console.log(msg);
	}
}
