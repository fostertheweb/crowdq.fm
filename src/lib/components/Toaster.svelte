<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description: string;
		icon: string;
		color: string;
		canDismiss: boolean;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import IconCopied from './icons/IconCopied.svelte';
	import IconX from './icons/IconX.svelte';
</script>

<div use:portal>
	{#each $toasts as { id, data } (id)}
		<div class="absolute top-4 z-50 flex w-full flex-col items-center justify-center">
			<div
				class="flex w-fit items-center gap-2 rounded-full border border-white/20 bg-stone-900/60 px-3 py-2 text-sm text-white shadow-lg"
				use:melt={$content(id)}>
				{#if data.icon}
					<span class="px-1 text-green-300">
						{#if data.icon === 'copied'}
							<IconCopied />
						{/if}</span>
				{/if}
				<div class="">
					<h3 use:melt={$title(id)}>
						{data.title}
					</h3>
					{#if data.description.length > 0}
						<div use:melt={$description(id)}>
							{data.description}
						</div>
					{/if}
				</div>
				{#if !data.canDismiss}
					<button
						class="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/20"
						use:melt={$close(id)}
						aria-label="close notification">
						<IconX />
					</button>
				{/if}
			</div>
		</div>
	{/each}
</div>
