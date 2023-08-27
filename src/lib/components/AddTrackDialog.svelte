<script lang="ts">
	import { melt } from '@melt-ui/svelte';

	export let title, content, description, overlay, close;
</script>

<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
<div
	class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
            p-6 shadow-lg"
	use:melt={$content}
>
	<h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
		<i class="fa-regular fa-list-music"></i>
		Add Track to Queue</h2>
	<p use:melt={$description} class="rounded py-2 px-4 text-sm bg-stone-100 mb-5 mt-2 leading-normal text-stone-600">
		You can copy/paste or drag and drop anywhere in the window.
	</p>

	<fieldset class="space-y-2">
		<label class="w-[90px] text-right text-stone-800" for="link"
			>YouTube URL, Spotify Track or Playlist Link</label
		>
		<input
			class="inline-flex w-full flex-1 items-center justify-center rounded border
                    border-solid border-stone-200 bg-stone-100 p-2 px-3 leading-none text-stone-800"
			id="link"
			placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQD"
		/>
	</fieldset>
	<div class="mt-6 flex justify-end gap-4">
		<button
			use:melt={$close}
			class="inline-flex h-8 items-center justify-center rounded
                    bg-stone-100 px-4 font-medium leading-none text-stone-600 hover:bg-stone-200"
		>
			Cancel
		</button>
		<button
			use:melt={$close}
			class="inline-flex h-8 items-center justify-center rounded
                    bg-orange-300 px-4 font-medium leading-none text-orange-900 hover:bg-orange-400"
		>
			Add
		</button>
	</div>
	<button
		use:melt={$close}
		aria-label="close"
		class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                items-center justify-center rounded-full p-1 text-stone-800
                hover:bg-stone-200 focus:shadow-stone-400"
	>
		<i class="fa-regular fa-times" />
	</button>
</div>
