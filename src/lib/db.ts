import Dexie, { type Table } from 'dexie';
import type { QueueItem } from './types';

// constructor will take roomId param
// db will be created when in a Room
export class CrowdQDatabase extends Dexie {
	tracks!: Table<QueueItem>;

	constructor() {
		super('venue');

		this.version(1).stores({});
	}
}

// TODO: do not export
export const db = new CrowdQDatabase();
