<script lang="ts">
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
</script>

<div class="bg-gradient-to-br from-stone-50 to-rose-50 p-8">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between pb-8">
		<h3 class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-white">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>

		<div></div>
	</nav>
	<header class="flex flex-col justify-center">
		<div class="py-8">
			<h1 class="font-general text-4xl font-semibold">
				collaborative play queue
				<br />for <span class="text-rose-500">now</span> or
				<span class="text-orange-500">later</span>
			</h1>
			<p class="mt-8 text-base font-normal text-stone-600 dark:text-stone-200">
				Create or join a room with friends for your perfect listening party.
				<br />Can't sync up? Share a play queue with friends for another time.
			</p>

			<div class="mt-8 flex items-center gap-8 tracking-wide">
				<a
					href="/lobby"
					class="rounded-full border-2 border-rose-500 bg-rose-500 px-4 py-2 font-general font-semibold tracking-wide text-white shadow hover:brightness-125">
					Create Room
				</a>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<p class="text-sm text-stone-500 dark:text-stone-300">Supporting</p>
			<div class="flex items-center gap-2">
				<img
					class="h-6 opacity-70 invert dark:opacity-90 dark:invert-0"
					src="/images/spotify-white.png"
					width={80}
					height={24}
					alt="Spotify" />
				<IconPlus />
				<img
					class="-ml-2 h-6 scale-75 opacity-70 invert dark:opacity-90 dark:invert-0"
					src="/images/youtube-white.png"
					width={108}
					height={18}
					alt="YouTube" />
			</div>
		</div>
	</header>
</div>
<footer class="bg-white dark:bg-stone-900">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 p-8 text-center text-sm text-stone-500 dark:text-stone-400 md:flex-row md:justify-between">
		<div class="flex items-baseline gap-1">
			Made by <a href="https://github.com/fostertheweb" class="underline hover:text-stone-700"
				>fostertheweb</a>
		</div>

		<div class="flex items-center gap-3 font-semibold text-stone-600 dark:text-stone-400">
			<a href="#">Privacy Policy</a>
			<div class="h-4 w-px bg-stone-500/20" />
			<a href="#">Changelog</a>
		</div>
	</div>
</footer>

<style>
	header {
		min-height: 60vh;
	}
</style>
