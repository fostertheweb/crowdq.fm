import { writable } from 'svelte/store';

import type PartySocket from 'partysocket';

export const party = writable<PartySocket | null>(null);
