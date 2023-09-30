import { writable } from 'svelte/store';
import type { QueueItem } from '$lib/types';

export const playQueue = writable<Array<QueueItem>>([]);
