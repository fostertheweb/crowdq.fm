<script lang="ts">
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import {
		createQueueItemFromTikTok,
		createQueueItemFromTrack,
		createQueueItemFromVideo,
		store
	} from '$lib/db';
	import { getTracksFromLink } from '$lib/spotify';
	import { party } from '$lib/stores/party';
	import { getTikTokEmbed } from '$lib/tiktok';
	import { getVideoFromLink } from '$lib/youtube';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { get } from 'svelte/store';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	let link: string;

	async function handleAddSong() {
		if (link.includes('spotify')) {
			const tracks = await getTracksFromLink(link);
			tracks.forEach((track) => {
				store.addRow('items', createQueueItemFromTrack(track, get(party)!.id));
			});
		} else if (link.includes('tiktok')) {
			const tiktok = await getTikTokEmbed(link);
			console.log(tiktok);
			store.addRow('items', createQueueItemFromTikTok(tiktok, get(party)!.id));
		} else {
			const video = await getVideoFromLink(link);
			store.addRow('items', createQueueItemFromVideo(video, get(party)!.id));
		}
		$open = false;
	}
</script>

<button
	use:melt={$trigger}
	class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200">
	<IconPlus />
	<span class="font-general font-medium tracking-wide">Add</span>
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
				class="m-0 text-center font-general text-base font-medium tracking-wide text-stone-500">
				Add Song to Queue
			</h3>
			<div class="h-4" />

			<fieldset class="space-y-2">
				<label class="w-[90px] text-right font-medium text-stone-600" for="link"
					>Spotify Song Link or YouTube URL</label>
				<input
					on:change={(e) => (link = e.currentTarget.value)}
					on:keydown={(e) => e.code === 'Enter' && handleAddSong()}
					name="link"
					class="inline-flex w-full flex-1 items-center justify-center rounded border
                    border-solid border-stone-200 bg-stone-100 p-2 px-3 leading-none text-stone-800 outline-orange-400"
					id="link"
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQD" />
			</fieldset>

			<div class="h-4" />

			<p
				use:melt={$description}
				class="mb-5 mt-2 flex items-baseline gap-2 rounded bg-stone-100 px-4 py-2 text-sm leading-normal text-stone-600">
				You can also drag and drop one or more songs anywhere in the window.
			</p>

			<div class="mt-6 flex justify-end gap-4 font-general font-medium tracking-wide">
				<button
					use:melt={$close}
					class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
					Cancel
				</button>
				<button
					on:click={handleAddSong}
					class="inline-flex items-center justify-center gap-1 rounded-full
                    bg-orange-300 px-4 py-3 font-medium leading-none text-orange-900 hover:bg-orange-400">
					<IconPlus />
					<span>Add</span>
				</button>
			</div>
		</div>
	{/if}
</div>
