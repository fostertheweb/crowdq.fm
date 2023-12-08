<script lang="ts">
	import IconPause from '$lib/components/icons/IconPause.svelte';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import { party } from '$lib/stores/party';
	import { accentColor, playerStatus } from '$lib/stores/player';
	import { darken, lighten } from 'polished';

	export let isHost = false;

	async function handleClick() {
		if ($playerStatus === 'playing') {
			$party?.send('pause');
		} else if ($playerStatus === 'paused') {
			$party?.send('resume');
		} else {
			$party?.send('play_next_track');
		}
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

{#if isHost}
	<div style={cssVariables}>
		<button
			on:click={handleClick}
			disabled={$playerStatus === 'loading'}
			class="flex h-10 w-10 items-center justify-center rounded-full transition-colors ease-linear">
			{#if $playerStatus === 'playing'}
				<IconPause />
			{:else if $playerStatus === 'loading'}
				<IconPause />
			{:else}
				<IconPlay />
			{/if}
		</button>
	</div>
{/if}

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
