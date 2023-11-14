<script lang="ts">
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';

	import { Spotify } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import { onDestroy } from 'svelte';
	import DeviceSelector from './DeviceSelector.svelte';

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
	class="flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 text-sm text-white hover:text-white hover:brightness-125 disabled:opacity-60 dark:bg-green-600 dark:text-white">
	<IconPlay lg={false} />
	<span class="font-readex-pro font-medium tracking-wide">Play in Spotify</span>
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
            p-6 pt-2 shadow-lg"
			use:melt={$content}>
			<h3
				use:melt={$title}
				class="font-readex-pro m-0 text-center text-base font-medium tracking-wide text-stone-500">
				Select Spotify Device
			</h3>
			<div class="h-4" />

			<DeviceSelector {devices} {isAdding} {shouldOpenSpotify} {addToQueue} {cancel} />
		</div>
	{/if}
</div>
