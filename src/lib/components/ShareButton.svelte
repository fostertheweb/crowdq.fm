<script lang="ts">
	import { browser } from '$app/environment';
	import IconShare from '$lib/components/icons/IconShare.svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { addToast } from './Toaster.svelte';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'left'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: true,
		forceVisible: true
	});

	async function share() {
		if (browser) {
			const url = window.location.toString();

			if (navigator.share) {
				await navigator.share({ text: url });
			} else {
				await window.navigator.clipboard.writeText(url);
				// TODO: override delay
				addToast({
					closeDelay: 1500,
					data: {
						title: 'Copied',
						description: '',
						color: 'text-green-400',
						icon: 'copied',
						canDismiss: false
					}
				});
			}
		}
	}
</script>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-20 flex w-fit items-center gap-2 rounded-lg border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-600 shadow-md shadow-black/5 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900 dark:text-stone-50">
		<div use:melt={$arrow} class="border-l border-t border-stone-200 dark:border-stone-800" />
		<p class="text-xs font-medium">Copy invite link</p>
	</div>
{/if}

<button
	aria-label="Copy invite link"
	use:melt={$trigger}
	on:click={share}
	class="flex h-8 w-8 items-center justify-center gap-2 rounded-full bg-stone-200/60 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200"
	><IconShare /></button>
