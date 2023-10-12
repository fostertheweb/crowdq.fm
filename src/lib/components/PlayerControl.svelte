<script lang="ts">
	import { lighten } from 'polished';
	import { party } from '$lib/stores/party';
	import { accentColor, playerStatus } from '$lib/stores/player';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import IconPause from '$lib/components/icons/IconPause.svelte';

	async function playNextTrack() {
		$party?.send('play_next_track');
	}

	async function pause() {
		$party?.send('pause');
	}
</script>

{#if $playerStatus === 'playing'}
	<button
		on:click={pause}
		style={`--hover-bg:${lighten(0.25, $accentColor)};`}
		class="flex h-10 w-10 items-center justify-center rounded-full"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPause />
	</button>
{:else if $playerStatus === 'loading'}
	<button
		disabled
		style={`--hover-bg:${lighten(0.25, $accentColor)};`}
		class="flex h-10 w-10 items-center justify-center rounded-full"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPause />
	</button>
{:else}
	<button
		on:click={playNextTrack}
		style={`--hover-bg:${lighten(0.25, $accentColor)};`}
		class="flex h-10 w-10 items-center justify-center rounded-full"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPlay />
	</button>
{/if}

<style>
	button:hover {
		background-color: var(--hover-bg) !important;
	}
</style>
