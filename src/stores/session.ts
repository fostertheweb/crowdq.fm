import { writable } from 'svelte/store';

export const clientToken = writable(null);
export const userToken = writable(null);
export const user = writable(null);
