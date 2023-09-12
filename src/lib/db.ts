import Dexie, { type Table } from 'dexie';
import type { QueueItem } from './types';

// constructor will take roomId param
// db will be created when in a Room
export class CrowdQDatabase extends Dexie {
	items!: Table<QueueItem>;

	constructor(slug: string) {
		super(slug);

		this.version(1).stores({});
	}
}
