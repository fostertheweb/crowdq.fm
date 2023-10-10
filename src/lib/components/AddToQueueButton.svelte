<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import IconX from './icons/IconX.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();
</script>

<button
	use:melt={$trigger}
	class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
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
			<p
				use:melt={$description}
				class="mb-5 mt-2 rounded bg-stone-100 px-4 py-2 text-sm leading-normal text-stone-600">
				You can also drag and drop one or more songs anywhere in the window.
			</p>

			<fieldset class="space-y-2">
				<label class="w-[90px] text-right font-medium text-stone-600" for="link"
					>Spotify Song Link or YouTube URL</label>
				<input
					class="inline-flex w-full flex-1 items-center justify-center rounded border
                    border-solid border-stone-200 bg-stone-100 p-2 px-3 leading-none text-stone-800"
					id="link"
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQD" />
			</fieldset>
			<div class="mt-6 flex justify-end gap-4 font-general font-medium tracking-wide">
				<button
					use:melt={$close}
					class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
					Cancel
				</button>
				<button
					use:melt={$close}
					class="inline-flex items-center justify-center gap-1 rounded-full
                    bg-orange-300 px-4 py-3 font-medium leading-none text-orange-900 hover:bg-orange-400">
					<IconPlus />
					<span>Add</span>
				</button>
			</div>
		</div>
	{/if}
</div>
