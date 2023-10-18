<script lang="ts">
	import Player from '$lib/components/dummy/Player.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
</script>

<div class="bg-gradient-to-br from-stone-50 to-rose-50 p-8 dark:from-stone-950 dark:to-rose-950">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between pb-8">
		<h3 class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-white">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>

		<div></div>
	</nav>
	<header class="mx-auto flex max-w-7xl flex-col justify-center">
		<h1 class="font-general text-4xl font-semibold dark:text-stone-100">
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
		<div class="mt-8 flex items-center gap-3 text-stone-500 dark:text-stone-300">
			<p class="text-sm">Supporting</p>
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
<section>
	<!-- queue -->
</section>
<section class="p-8">
	<div class="relative mx-auto flex w-full max-w-7xl py-16">
		<div
			class="absolute right-96 top-8 h-72 w-72 rounded-full bg-[#e8d1b7]/70 mix-blend-multiply blur-2xl" />
		<div
			class="absolute right-64 top-4 h-72 w-72 rounded-full bg-[#634c46]/50 mix-blend-multiply blur-2xl" />
		<div
			class="absolute right-16 top-16 h-72 w-72 rounded-full bg-[#db8654]/50 mix-blend-multiply blur-2xl" />
		<div class="w-1/2">
			<h3 class="font-general text-2xl font-semibold text-stone-600">Listen to music</h3>
		</div>
		<div class="flex w-1/2 justify-center">
			<Player />
		</div>
	</div>
</section>
<section>
	<!-- share play queue -->
</section>
<footer class="bg-white p-8 dark:bg-stone-900">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center text-sm text-stone-500 dark:text-stone-400 md:flex-row md:justify-between">
		<div class="flex items-baseline gap-1">
			Made by <a href="https://github.com/fostertheweb" class="underline hover:text-stone-700"
				>fostertheweb</a>
		</div>

		<div class="flex items-center gap-3 font-semibold text-stone-600 dark:text-stone-400">
			<!-- github link -->
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
