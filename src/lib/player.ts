import { get } from 'svelte/store';
import { Spotify } from './spotify';
import { SpotifyPlayer, YouTubePlayer, currentQueueItem } from './stores/player';
import { playQueue } from './stores/queue';
import { spotifyDevice } from './stores/spotify';
import type { PlayerStatus, QueueItem } from './types';

export async function playNextTrack() {
	let nextIndex = 0;

	const currentItem = get(currentQueueItem);
	const queue = get(playQueue);

	if (currentItem) {
		nextIndex = queue.indexOf(currentItem) + 1;
	}
	const nextItem = queue[nextIndex];
	currentQueueItem.set(nextItem);

	UniversalPlayer.play({ item: nextItem, position: 0, status: 'playing' });
}

type Playback = {
	item: QueueItem;
	position: number;
	status: PlayerStatus;
};

export class UniversalPlayer {
	static async play(playback: Playback) {
		const device = get(spotifyDevice);
		const youtube = get(YouTubePlayer);

		if (playback.item?.provider === 'spotify') {
			if (youtube) {
				console.log(youtube);
				// youtube.stopVideo();
			}

			if (device) {
				await Spotify.player.startResumePlayback(device, undefined, [
					'spotify:track:' + playback.item.providerId
				]);
			}
		}

		if (playback.item?.provider === 'youtube') {
			const videoId = playback.item?.providerId;

			if (device) {
				await Spotify.player.pausePlayback(device);
			}

			youtube?.loadVideoById({
				videoId,
				startSeconds: playback.position / 1000
			});
			youtube?.playVideo();
		}
	}

	static resume() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.resume();
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.playVideo();
			}
		}
	}

	static pause() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.pause();
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.pauseVideo();
			}
		}
	}

	static stop() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.pause();
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.stopVideo();
			}
		}
	}

	static setVolume(volume: number) {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			get(SpotifyPlayer)?.setVolume(volume / 100);
			get(YouTubePlayer)?.setVolume(volume);
		}
	}
}
