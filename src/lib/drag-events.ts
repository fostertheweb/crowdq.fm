import { Spotify, getTracksFromLink } from '$lib/spotify';
import { createQueueItem, store } from '$lib/db';

export async function handleDrop(e: DragEvent) {
	// hide toast
	const dropData = e.dataTransfer?.getData('text/plain');

	if (dropData) {
		const { id } = await Spotify.currentUser.profile();
		const tracks = await getTracksFromLink(dropData);
		const items = tracks.map((track) => createQueueItem(track, id));
		items.forEach((item) => {
			store.addRow('items', item);
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
