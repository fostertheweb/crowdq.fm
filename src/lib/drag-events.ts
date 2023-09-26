import { get } from 'svelte/store';
import { playQueue } from '$lib/stores/queue';
import { getTracksFromLink } from '$lib/spotify';
import { createQueueItem, store } from '$lib/db';

export async function handleDrop(e: DragEvent) {
	// hide toast
	const dropData = e.dataTransfer?.getData('text/plain');

	if (dropData) {
		const tracks = await getTracksFromLink(dropData);
		const items = tracks.map(createQueueItem);
		items.forEach((item) => {
			store.setRow('items', `item-${get(playQueue).length + 1}`, item);
		});
	}
}

export function handleDragEnter(e: DragEvent) {
	// e.preventDefault();
	// show a toast "Drop anywhere on the screen to add to queue."
}

export function handleDragOver(e: DragEvent) {
	// e.preventDefault();
}

export function handleDragLeave(e: DragEvent) {
	// e.preventDefault();
	// hide toast
}
