import { get } from 'svelte/store';
import { Spotify as SpotifyApiClient } from './spotify';
import {
	SpotifyPlayer,
	YouTubePlayer,
	currentQueueItem,
	playerPosition,
	playerStatus
} from './stores/player';
import { spotifyDevice } from './stores/spotify';
import type { QueueItem } from './types';

export async function next(nextQueueItem: QueueItem | null, audioEnabled: boolean) {
	currentQueueItem.set(nextQueueItem);

	if (nextQueueItem) {
		if (audioEnabled) {
			play(nextQueueItem, 0);
		} else {
			playerPosition.set(0);
			playerStatus.set('playing');
		}
	} else {
		console.log('Queue has ended');
	}
}

export async function play(item: QueueItem, position: number) {
	const device = get(spotifyDevice);
	const youtube = get(YouTubePlayer);

	const spotifyPlaybackState = await SpotifyApiClient.player.getPlaybackState();
	const isSpotifyPlaying =
		spotifyPlaybackState?.is_playing && device === spotifyPlaybackState.device.id;
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

export function resume() {
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

export function pause() {
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

export function stop() {
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

export function setVolume(volume: number) {
	const youtube = get(YouTubePlayer);
	const spotify = get(SpotifyPlayer);
	const currentItem = get(currentQueueItem);

	if (currentItem) {
		if (spotify) {
			spotify.setVolume(volume / 100);
		}

		if (youtube) {
			youtube.setVolume(volume);
		}
	}
}

export async function getPosition() {
	const currentItem = get(currentQueueItem);

	if (currentItem) {
		if (currentItem.provider === 'spotify') {
			const currentState = await get(SpotifyPlayer)?.getCurrentState();
			return currentState?.position || 0;
		}

		if (currentItem.provider === 'youtube') {
			const position = get(YouTubePlayer)?.getCurrentTime();
			return position ? position * 1000 : 0;
		}
	}

	return 0;
}
