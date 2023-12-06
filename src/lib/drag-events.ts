import { createQueueItemFromTrack, createQueueItemFromVideo, store } from '$lib/db';
import { Spotify, getTracksFromLink } from '$lib/spotify';
import { addToast } from './components/Toaster.svelte';
import { getVideoFromLink } from './youtube';

export async function handleDrop(e: DragEvent) {
	// hide toast
	const dropData = e.dataTransfer?.getData('text/plain');

	if (dropData) {
		const user = await Spotify.currentUser.profile();

		if (dropData.includes('spotify')) {
			const tracks = await getTracksFromLink(dropData);
			const items = tracks.map((track) => createQueueItemFromTrack(track, user.id));
			items.forEach((item) => {
				store.addRow('items', item);
			});
		} else {
			const video = await getVideoFromLink(dropData);

			if (video.status.embeddable) {
				store.addRow('items', createQueueItemFromVideo(video, user.id));
			} else {
				addToast({
					closeDelay: 5000,
					data: {
						title: 'Cannot add video',
						description: 'Channel does not allow embedding',
						color: 'text-red-400',
						icon: 'error',
						canDismiss: true
					}
				});
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
