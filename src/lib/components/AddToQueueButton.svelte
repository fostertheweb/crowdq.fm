<script lang="ts">
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { createQueueItemFromTrack, createQueueItemFromVideo, store } from '$lib/db';
	import { Spotify, getTracksFromLink } from '$lib/spotify';
	import { getVideoFromLink } from '$lib/youtube';
	import { createDialog, melt } from '@melt-ui/svelte';
	import IconInfo from './icons/IconInfo.svelte';
	import IconPlusMusic from './icons/IconPlusMusic.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	let link: string;
	let inputElement: HTMLInputElement;

	async function handleAddSong() {
		if (!link || link.length === 0) {
			inputElement.focus();
			return;
		}

		const user = await Spotify.currentUser.profile();

		if (link.includes('spotify')) {
			const tracks = await getTracksFromLink(link);
			tracks.forEach((track) => {
				store.addRow('items', createQueueItemFromTrack(track, user.id));
			});
		} else {
			const video = await getVideoFromLink(link);
			store.addRow('items', createQueueItemFromVideo(video, user.id));
		}
		$open = false;
	}
</script>

<button
	use:melt={$trigger}
	class="flex items-center gap-1 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200">
	<IconPlusMusic />
	<span class="font-readex-pro font-medium">Add</span>
</button>
<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-6
            pt-2 shadow-lg dark:bg-stone-700"
			use:melt={$content}>
			<h3
				use:melt={$title}
				class="m-0 py-2 text-center font-readex-pro text-base font-medium text-stone-500 dark:text-stone-300">
				Add Song to Queue
			</h3>
			<div class="h-4" />

			<fieldset class="space-y-2">
				<label
					class="w-[90px] text-right text-sm font-medium text-stone-600 dark:text-stone-300"
					for="link">Spotify Song Link or YouTube URL</label>
				<input
					bind:this={inputElement}
					on:change={(e) => (link = e.currentTarget.value)}
					on:keydown={(e) => e.code === 'Enter' && handleAddSong()}
					name="link"
					class="ring-jake-400/20 focus:border-jake-400 inline-flex w-full flex-1 items-center justify-center rounded-lg border-2 border-stone-200 bg-stone-100 px-4 py-3 leading-none text-stone-800 focus:outline-0 focus:ring-4 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300"
					id="link"
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQD" />
			</fieldset>

			<div class="h-6" />

			<div use:melt={$description} class=" flex items-center gap-2 text-stone-400">
				<IconInfo />
				<p class="text-sm">Drag and drop one or more songs anywhere.</p>
			</div>

			<div class="mt-6 flex justify-end gap-4 font-readex-pro font-medium">
				<button
					use:melt={$close}
					class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 shadow-sm hover:bg-stone-200/60 dark:border-stone-500/30 dark:bg-stone-600 dark:text-stone-200 dark:hover:bg-stone-500/60">
					Cancel
				</button>
				<button
					on:click={handleAddSong}
					class="border-jake-300/20 bg-jake-200 dark:bg-jake-600 dark:text-jake-50 dark:hover:bg-jake-600 text-jake-950 hover:bg-jake-300/80 inline-flex items-center justify-center gap-1 rounded-full
                    border px-4 py-3 font-medium leading-none shadow-sm dark:hover:brightness-105">
					<IconPlus />
					<span>Add</span>
				</button>
			</div>
		</div>
	{/if}
</div>
