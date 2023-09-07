import type { CurrentPlayback, PlayerState } from '$lib/types';
import { writable } from 'svelte/store';

export const currentPlayback = writable<CurrentPlayback | null>(null);

export function transformSpotifyState(playerState: PlayerState): CurrentPlayback {
	if (!playerState) {
		return { status: 'idle', position: 0 };
	}

	if (playerState.loading === true) {
		return {
			status: 'loading',
			position: playerState.position
		};
	}

	if (playerState.paused === true) {
		const prevTracks = playerState.track_window?.previous_tracks;
		if (prevTracks && prevTracks.length > 0) {
			// might have to compare against current_item, not sure if
			// current functionality is spotify player bug
			return {
				status: 'idle',
				position: playerState.position
			};
		}

		return {
			status: 'paused',
			position: playerState.position
		};
	}

	return {
		status: 'playing',
		position: playerState.position
	};
}
