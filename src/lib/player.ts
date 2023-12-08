import { get } from 'svelte/store';
import { Spotify as SpotifyApiClient } from './spotify';
import {
	SpotifyPlayer,
	YouTubePlayer,
	currentQueueItem,
	playerPosition,
	playerStatus
} from './stores/player';
import { playQueue } from './stores/queue';
import { spotifyDevice } from './stores/spotify';
import type { QueueItem } from './types';

export async function playNextTrack(audioEnabled: boolean) {
	let nextIndex = 0;

	const currentItem = get(currentQueueItem);
	const queue = get(playQueue);

	if (currentItem) {
		nextIndex = queue.indexOf(currentItem) + 1;
	}
	const nextItem = queue[nextIndex];
	currentQueueItem.set(nextItem);

	if (audioEnabled) {
		UniversalPlayer.play(nextItem, 0);
	} else {
		playerPosition.set(0);
		playerStatus.set('playing');
	}
}

export class UniversalPlayer {
	static async play(item: QueueItem, position: number) {
		const device = get(spotifyDevice);
		const youtube = get(YouTubePlayer);

		const spotifyPlaybackState = await SpotifyApiClient.player.getPlaybackState();
		const isSpotifyPlaying = spotifyPlaybackState?.is_playing;
		const isYouTubePlaying = youtube?.getPlayerState() === 1;

		if (item.provider === 'spotify') {
			if (youtube && isYouTubePlaying) {
				youtube.stopVideo();
			}

			if (device) {
				// TODO: fix this mess in @fostertheweb/spotify-web-sdk lib with an object
				await SpotifyApiClient.player.startResumePlayback(
					device,
					undefined,
					['spotify:track:' + item.providerId],
					undefined,
					position
				);
				playerStatus.set('playing');
			}
		}

		if (item.provider === 'youtube') {
			const videoId = item.providerId;

			if (device && isSpotifyPlaying) {
				await SpotifyApiClient.player.pausePlayback(device);
			}

			youtube?.loadVideoById({
				videoId,
				startSeconds: position / 1000
			});
			playerStatus.set('playing');
		}
	}

	static resume() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.resume();
				playerStatus.set('playing');
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.playVideo();
				playerStatus.set('playing');
			}
		}
	}

	static pause() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.pause();
				playerStatus.set('paused');
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.pauseVideo();
				playerStatus.set('paused');
			}
		}
	}

	static stop() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				get(SpotifyPlayer)?.pause();
				playerStatus.set('paused');
			}

			if (currentItem.provider === 'youtube') {
				get(YouTubePlayer)?.stopVideo();
				playerStatus.set('paused');
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

	static async getPosition() {
		const currentItem = get(currentQueueItem);

		if (currentItem) {
			if (currentItem.provider === 'spotify') {
				const currentState = await get(SpotifyPlayer)?.getCurrentState();
				return currentState?.position;
			}

			if (currentItem.provider === 'youtube') {
				const position = get(YouTubePlayer)?.getCurrentTime();
				return position ? position * 1000 : 0;
			}
		}
	}
}
