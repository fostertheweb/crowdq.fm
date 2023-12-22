import type { QueueItem } from '$lib/types';
import { writable } from 'svelte/store';

export const playQueue = writable<Array<QueueItem>>([]);
export const showOverlay = writable(false);
export const queueEnded = writable(false);
