<script lang="ts">
	import clsx from 'clsx';
	import IconCheck from '../icons/IconCheck.svelte';
	import IconDevice from '../icons/IconDevice.svelte';

	const devices = [
		{
			id: 'laptop',
			isChecked: false,
			name: 'Laptop',
			type: 'Computer'
		},
		{
			id: 'phone',
			isChecked: true,
			name: 'iPhone',
			type: 'Smartphone'
		},
		{
			id: 'homepod',
			isChecked: false,
			name: 'HomePod',
			type: 'Speaker'
		},
		{
			id: 'tv',
			isChecked: false,
			name: 'TV',
			type: 'TV'
		}
	];
</script>

<div class="flex flex-col gap-4">
	{#each devices as device}
		<div class="flex w-full items-center gap-4">
			<div
				class={clsx(
					'flex h-4 w-4 items-center justify-center rounded-full border ',
					!device.isChecked &&
						'border-stone-300 bg-stone-200 text-stone-200 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-600',
					device.isChecked &&
						'border-jake-500 bg-jake-400 text-white dark:border-jake-400 dark:bg-jake-500'
				)}>
				<IconCheck />
			</div>
			<div
				class={clsx(
					'flex items-center gap-2 font-readex-pro text-lg',
					device.isChecked && 'text-jake-700 dark:text-jake-400',
					!device.isChecked && 'text-stone-700 dark:text-stone-300'
				)}>
				<IconDevice deviceType={device.type} />
				{device.name}
			</div>
		</div>
	{/each}
</div>
