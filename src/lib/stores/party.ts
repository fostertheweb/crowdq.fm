import { writable } from 'svelte/store';

import type { Listener } from '$lib/types';
import type PartySocket from 'partysocket';

export const party = writable<PartySocket | null>(null);

export const listeners = writable<Listener[]>([]);
