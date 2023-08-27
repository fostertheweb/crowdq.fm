import type { QueueItem } from '$lib/types';
import { writable } from 'svelte/store';

export const playQueue = writable<Array<QueueItem>>([]);
