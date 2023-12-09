import type * as Party from 'partykit/server';

export default class WebSocket implements Party.Server {
	constructor(readonly party: Party.Party) {}

	onConnect(connection: Party.Connection<unknown>): void | Promise<void> {
		const message = { type: 'connect', id: connection.id };
		this.party.broadcast(JSON.stringify(message));

		console.log(message);

		const message2 = { type: 'sync_request', id: connection.id };
		const connections = [...this.party.getConnections()];
		const others = connections.filter((c) => c.id !== connection.id);

		if (others.length > 0) {
			others[0].send(JSON.stringify(message2));

			console.log(message2);
		}
	}

	onClose(connection: Party.Connection<unknown>): void | Promise<void> {
		const message = { type: 'remove', table: 'listeners', id: connection.id };
		this.party.broadcast(JSON.stringify(message));

		console.log(message);
	}

	onMessage(message, sender): void | Promise<void> {
		try {
			const json = JSON.parse(message);
			const connections = [...this.party.getConnections()];

			if (json.type === 'sync_request') {
				const others = connections.filter((c) => c.id !== sender.id);
				if (others.length > 0) {
					others[0].send(JSON.stringify(json));
					console.log(json);
				}
			}

			if (json.type === 'sync_response') {
				const requester = connections.find((c) => c.id == json.id);
				requester?.send(JSON.stringify(json));
				console.log(json);
			}
		} catch (e) {
			// fallback for string events
			const msg = { type: message, id: sender.id };

			this.party.broadcast(JSON.stringify(msg));

			console.log(msg);
		}
	}
}
