import type { PlayerStatus, QueueItem } from '$lib/types';
import { writable } from 'svelte/store';

export const currentQueueItem = writable<QueueItem | null>(null);
export const playerPosition = writable(0);
export const playerStatus = writable<PlayerStatus>('idle');
export const accentColor = writable<string>('#fb923c');

export const YouTubePlayer = writable<YT.Player | null>(null);
export const SpotifyPlayer = writable<Spotify.Player | null>(null);
