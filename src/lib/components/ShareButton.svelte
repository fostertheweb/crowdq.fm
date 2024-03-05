<script lang="ts">
	import { browser } from '$app/environment';
	import IconShare from '$lib/components/icons/IconShare.svelte';
	import { Tooltip } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { addToast } from './Toaster.svelte';

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
						color: 'text-[#1cd760]',
						icon: 'copied',
						canDismiss: false
					}
				});
			}
		}
	}
</script>

<Tooltip.Root openDelay={0} closeDelay={0} closeOnPointerDown>
	<Tooltip.Trigger>
		<button
			aria-label="Copy invite link"
			on:click={share}
			class="flex h-8 w-8 items-center justify-center gap-2 rounded-full bg-stone-200/60 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200"
			><IconShare /></button>
	</Tooltip.Trigger>
	<Tooltip.Content
		side="left"
		sideOffset={4}
		transition={fade}
		transitionConfig={{ duration: 100 }}
		class="z-20 flex w-fit items-center gap-2 rounded-lg border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-600 shadow-md shadow-black/5 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900 dark:text-stone-50">
		<Tooltip.Arrow class="border-l border-t border-stone-200 dark:border-stone-800" />
		<p class="text-xs font-medium">Copy invite link</p>
	</Tooltip.Content>
</Tooltip.Root>
