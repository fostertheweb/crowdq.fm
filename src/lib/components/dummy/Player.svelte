<script lang="ts">
	import { lighten } from 'polished';
	import IconHeart from '../icons/IconHeart.svelte';
	import IconPause from '../icons/IconPause.svelte';
	import VolumeControl from './VolumeControl.svelte';

	let item = {
		artwork: 'https://i.scdn.co/image/ab67616d0000b273d03c8d74d7f963dee63ef893',
		name: 'On My Mama',
		artists: 'Victoria Monét'
	};

	let accentColor = '#db8654';
</script>

<div
	style:width="480px"
	class="flex h-fit flex-col gap-4 rounded-lg border border-white/60 bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-md dark:border-white/20 dark:bg-opacity-20">
	<div class="relative flex items-center gap-4">
		<img src={item.artwork} alt="" class="h-28 w-28 rounded shadow-md" />
		<div class="space-y-1">
			<div class="text-lg dark:text-white">{item.name}</div>
			<div class="text-base text-stone-700 dark:text-stone-400">
				{item.artists}
			</div>
		</div>
	</div>

	<div class="h-1.5 w-full rounded-full bg-stone-800/20 dark:bg-stone-800">
		<div
			class="cq-progress-bar h-1.5 rounded-full bg-transparent"
			style:background={accentColor}
			style:width="40%" />
	</div>

	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button
				class="flex h-10 w-10 items-center justify-center rounded-full"
				style:background-color={lighten(0.3, accentColor)}
				style:color={accentColor}>
				<IconPause />
			</button>
			<button
				class="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
				style:color={accentColor}>
				<IconHeart filled={true} />
			</button>
		</div>

		<VolumeControl />
	</div>
</div>
