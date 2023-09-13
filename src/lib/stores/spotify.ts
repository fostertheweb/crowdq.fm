import { writable } from 'svelte/store';

export const spotifyDevice = writable<string | null>(null);
