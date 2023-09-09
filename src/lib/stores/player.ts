import { writable } from 'svelte/store';
import type { QueueItem, PlayerStatus } from '$lib/types';

export const currentQueueItem = writable<QueueItem | null>(null);
export const playerPosition = writable(0);
export const playerStatus = writable<PlayerStatus>('idle');
