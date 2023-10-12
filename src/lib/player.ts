import { get } from 'svelte/store';
import { Spotify } from './spotify';
import { currentQueueItem } from './stores/player';
import { playQueue } from './stores/queue';
import { spotifyDevice } from './stores/spotify';

export async function playNextTrack() {
	let nextIndex = 0;

	const currentItem = get(currentQueueItem);
	const queue = get(playQueue);
	const device = get(spotifyDevice);

	if (currentItem) {
		nextIndex = queue.indexOf(currentItem) + 1;
	}
	const nextItem = queue[nextIndex];
	currentQueueItem.set(nextItem);

	if (device) {
		await Spotify.player.startResumePlayback(device, undefined, [
			'spotify:track:' + nextItem.providerId
		]);
	}
}

export async function pause() {
	const device = get(spotifyDevice);
	if (device) {
		await Spotify.player.pausePlayback(device);
	}
}
