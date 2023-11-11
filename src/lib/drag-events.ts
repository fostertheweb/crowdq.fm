import { createQueueItemFromTrack, createQueueItemFromVideo, store } from '$lib/db';
import { getTracksFromLink } from '$lib/spotify';
import { get } from 'svelte/store';
import { party } from './stores/party';
import { getVideoFromLink } from './youtube';

export async function handleDrop(e: DragEvent) {
	// hide toast
	const dropData = e.dataTransfer?.getData('text/plain');

	if (dropData) {
		const _party = get(party);

		if (_party) {
			if (dropData.includes('spotify')) {
				const tracks = await getTracksFromLink(dropData);
				const items = tracks.map((track) => createQueueItemFromTrack(track, _party.id));
				items.forEach((item) => {
					store.addRow('items', item);
				});
			} else {
				const video = await getVideoFromLink(dropData);
				store.addRow('items', createQueueItemFromVideo(video, _party.id));
			}
		}
	} else {
		// TODO: inform user they are not connected to the room
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
