import { writable } from 'svelte/store';

export const userToken = writable<string | null>(null);
export const user = writable(null);
