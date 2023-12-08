<script lang="ts">
	import { darken, lighten } from 'polished';
	import IconPause from '../icons/IconPause.svelte';
	import IconRemoveLike from '../icons/IconRemoveLike.svelte';
	import VolumeControl from './VolumeControl.svelte';

	const item = {
		artwork: 'https://i.scdn.co/image/ab67616d0000b273a0369b863f523411e35d817b',
		name: 'Rhythm & Blues',
		artists: 'Ayra Starr'
	};

	const accentColor = '#67c3dd';

	const styles = {
		'text-color': accentColor,
		'text-hover-color': accentColor,
		'light-bg': lighten(0.3, accentColor),
		'light-hover-bg': lighten(0.2, accentColor),
		'dark-text-color': darken(0.2, accentColor),
		'dark-text-hover-color': darken(0.15, accentColor),
		'dark-bg': lighten(0.1, accentColor),
		'dark-hover-bg': lighten(0.2, accentColor)
	};

	const cssVariables = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');
</script>

<div
	style={cssVariables}
	class="cq-player flex h-fit flex-col gap-4 rounded-lg border border-white/60 bg-white bg-opacity-60 p-4 shadow-lg backdrop-blur-md dark:border-white/20 dark:bg-opacity-20">
	<div class="relative flex items-center gap-4">
		<img src={item.artwork} alt="" class="h-28 w-28 rounded shadow-md" />
		<div class="space-y-1">
			<div class="text-lg dark:text-white">{item.name}</div>
			<div class="text-base text-stone-700 dark:text-white/70">
				{item.artists}
			</div>
		</div>
	</div>

	<div class="h-1.5 w-full rounded-full bg-black/10 dark:bg-stone-800">
		<div
			class="cq-progress-bar h-1.5 rounded-full bg-transparent"
			style:background={accentColor}
			style:width="40%" />
	</div>

	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button
				class="cq-dummy-pause flex h-10 w-10 cursor-default items-center justify-center rounded-full">
				<IconPause />
			</button>
			<button
				class="flex h-10 w-10 cursor-default items-center justify-center rounded-full text-stone-500 dark:bg-white/20 dark:text-stone-300"
				style:color={accentColor}>
				<IconRemoveLike />
			</button>
		</div>

		<VolumeControl />
	</div>
</div>

<style>
	.cq-player {
		width: 100%;
		max-width: 480px;
	}

	.cq-dummy-pause {
		color: var(--text-color);
		background-color: var(--light-bg);
	}

	@media (prefers-color-scheme: dark) {
		.cq-dummy-pause {
			color: var(--dark-text-color);
			background-color: var(--dark-bg);
		}
	}
</style>
