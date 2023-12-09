<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';

	import { Spotify } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import { onDestroy } from 'svelte';
	import DeviceSelector from './DeviceSelector.svelte';
	import IconSpotify from './icons/IconSpotify.svelte';

	export let disabled = true;
	export let devices: Device[] | undefined;

	let isAdding = false;
	let shouldOpenSpotify = false;

	const {
		elements: { trigger, overlay, content, title, portalled },
		states: { open }
	} = createDialog();

	function addToQueue(deviceId: string) {
		isAdding = true;

		const additions = $playQueue.map((item) => {
			const uri = `spotify:track:${item.providerId}`;
			return Spotify.player.addItemToPlaybackQueue(uri, deviceId);
		});

		Promise.all(additions).then(() => {
			isAdding = false;
			shouldOpenSpotify = true;
		});
	}

	function cancel() {
		$open = false;
	}

	onDestroy(() => {
		shouldOpenSpotify = false;
		$open = false;
	});
</script>

<button
	use:melt={$trigger}
	{disabled}
	class="flex items-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 text-sm text-white hover:text-white hover:brightness-125 disabled:opacity-60 dark:text-white">
	<IconSpotify />
	<span class="font-readex-pro font-medium">Play on Spotify</span>
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed bottom-0 left-0 z-50 h-fit max-h-[85vh] rounded-t
            bg-white p-6 pt-2 shadow-lg dark:bg-stone-700 sm:left-[50%] sm:top-[50%] sm:w-[90vw]
            sm:max-w-[450px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-b"
			use:melt={$content}>
			<h3
				use:melt={$title}
				class="m-0 py-2 text-center font-readex-pro text-base font-medium text-stone-500 dark:text-stone-300">
				Select Spotify Device
			</h3>
			<div class="h-4" />

			<DeviceSelector {devices} {isAdding} {shouldOpenSpotify} {addToQueue} {cancel} />
		</div>
	{/if}
</div>
