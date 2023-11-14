<script lang="ts">
	import IconPause from '$lib/components/icons/IconPause.svelte';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import { party } from '$lib/stores/party';
	import { accentColor, playerStatus } from '$lib/stores/player';
	import { darken, lighten } from 'polished';

	async function playNextTrack() {
		// TODO: fix resume functionality
		$party?.send('play_next_track');
	}

	async function pause() {
		$party?.send('pause');
	}

	$: styles = {
		'text-color': $accentColor,
		'text-hover-color': darken(0.05, $accentColor),
		'light-bg': lighten(0.3, $accentColor),
		'light-hover-bg': lighten(0.2, $accentColor),
		'dark-text-color': darken(0.2, $accentColor),
		'dark-text-hover-color': darken(0.15, $accentColor),
		'dark-bg': lighten(0.1, $accentColor),
		'dark-hover-bg': lighten(0.2, $accentColor)
	};

	$: cssVariables = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');
</script>

<div style={cssVariables}>
	{#if $playerStatus === 'playing'}
		<button
			on:click={pause}
			class="flex h-10 w-10 items-center justify-center rounded-full transition-colors ease-linear">
			<IconPause />
		</button>
	{:else if $playerStatus === 'loading'}
		<button
			disabled
			class="flex h-10 w-10 items-center justify-center rounded-full transition-colors ease-linear">
			<IconPause />
		</button>
	{:else}
		<button
			on:click={playNextTrack}
			class="flex h-10 w-10 items-center justify-center rounded-full transition-colors ease-linear">
			<IconPlay />
		</button>
	{/if}
</div>

<style>
	button {
		color: var(--text-color);
		background-color: var(--light-bg);
	}

	button:hover {
		color: var(--text-hover-color);
		background-color: var(--light-hover-bg) !important;
	}

	@media (prefers-color-scheme: dark) {
		button {
			color: var(--dark-text-color);
			background-color: var(--dark-bg);
		}

		button:hover {
			color: var(--dark-text-hover-color);
			background-color: var(--dark-hover-bg) !important;
		}
	}
</style>
