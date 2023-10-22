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

	// TODO: play spotify or youtube

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

/*

function play(playback: CurrentPlayback) {
    if (playback.item?.provider === "spotify") {
      youtube.stopVideo();
      spotifyApiPlay(playback);
    }

    if (playback.item?.provider === "youtube") {
      const videoId = playback.item?.provider_id;

      if (device && !spotify?.paused) {
        spotifyApiPause();
      }

      youtube.loadVideoById({
        videoId,
        startSeconds: playback.position / 1000,
      });
    }
  }

  function resume() {
    if (currentItemRef.current) {
      if (currentItemRef.current.provider === "spotify") {
        spotify.resume();
      }

      if (currentItemRef.current.provider === "youtube") {
        youtube.playVideo();
      }
    }
  }

  function pause() {
    if (currentItemRef.current) {
      if (currentItemRef.current.provider === "spotify") {
        spotify.pause();
      }

      if (currentItemRef.current.provider === "youtube") {
        youtube.pauseVideo();
      }
    }
  }

  function stop() {
    if (currentItemRef.current) {
      if (currentItemRef.current.provider === "spotify") {
        spotify.pause();
      }

      if (currentItemRef.current.provider === "youtube") {
        youtube.stopVideo();
      }
    }
  }

  function setVolume(volume: number) {
    if (currentItemRef.current) {
      if (currentItemRef.current.provider === "spotify") {
        spotify.setVolume(volume / 100);
      }

      if (currentItemRef.current.provider === "youtube") {
        youtube.setVolume(volume);
      }
    }
  }

  const getCurrentPlayback = useCallback(
    async (item) => {
      if (item) {
        if (item.provider === "spotify") {
          const playerState = await spotify.getCurrentState();
          return { item, ...transformSpotifyState(playerState) };
        }

        if (item.provider === "youtube") {
          return { item, ...transformYouTubeState(youtube) };
        }
      } else {
        return { item, status: "idle", position: 0 };
      }
    },
    [spotify, youtube]
  );

*/
