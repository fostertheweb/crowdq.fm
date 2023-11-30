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

	async function handleAddSong() {
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
				class="m-0 text-center font-readex-pro text-base font-medium tracking-wide text-stone-500 dark:text-stone-300">
				Add Song to Queue
			</h3>
			<div class="h-4" />

			<fieldset class="space-y-2">
				<label
					class="w-[90px] text-right text-sm font-medium text-stone-600 dark:text-stone-300"
					for="link">Spotify Song Link or YouTube URL</label>
				<input
					on:change={(e) => (link = e.currentTarget.value)}
					on:keydown={(e) => e.code === 'Enter' && handleAddSong()}
					name="link"
					class="inline-flex w-full flex-1 items-center justify-center rounded-lg border-2 border-stone-200 bg-stone-100 px-4 py-3 leading-none text-stone-800 ring-orange-400/20 focus:border-orange-400 focus:outline-0 focus:ring-4 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300"
					id="link"
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQD" />
			</fieldset>

			<div class="h-6" />

			<div
				use:melt={$description}
				class="flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-0 text-cyan-900 shadow shadow-black/5 dark:border-2 dark:bg-cyan-500/20 dark:text-cyan-100 dark:shadow-cyan-500/20">
				<div
					class="rounded-l-lg bg-cyan-100 px-6 py-6 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
					<IconInfo />
				</div>
				<p class="p-2 text-sm">You can drag and drop one or more songs anywhere in the window.</p>
			</div>

			<div class="mt-6 flex justify-end gap-4 font-readex-pro font-medium tracking-wide">
				<button
					use:melt={$close}
					class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 shadow-sm hover:bg-stone-200/60 dark:border-stone-500/30 dark:bg-stone-600 dark:text-stone-200 dark:hover:bg-stone-500/60">
					Cancel
				</button>
				<button
					on:click={handleAddSong}
					class="inline-flex items-center justify-center gap-1 rounded-full border border-orange-200/20
                    bg-orange-300 px-4 py-3 font-medium leading-none text-orange-900 shadow-sm hover:brightness-110">
					<IconPlus />
					<span>Add</span>
				</button>
			</div>
		</div>
	{/if}
</div>
