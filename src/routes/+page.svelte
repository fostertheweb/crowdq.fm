<script lang="ts"></script>

<header class="relative flex flex-col items-center bg-stone-50 dark:bg-stone-800">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between p-8">
		<div class="flex items-center gap-12">
			<div class="flex items-center gap-2">
				<h3 class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-white">
					crowdq<span class="text-orange-500">.</span>fm
				</h3>
			</div>
		</div>
	</nav>
	<div
		class="mx-auto flex max-w-7xl flex-col items-center justify-center pt-24 text-center text-stone-800 dark:text-stone-100">
		<h1 class="font-general text-3xl font-semibold">
			Shared{' '}
			<span
				class="underline decoration-orange-500/60 underline-offset-8 dark:decoration-orange-500">
				play queue
			</span>{' '}
			for friends
			<br /> online or on the couch
		</h1>
		<p class="mt-8 text-base font-normal text-stone-600 dark:text-stone-200">
			Stop listening alone and show everyone your great taste in music.
			<br /> Create a room and invite others to the listening party.
		</p>

		<div class="mt-8 flex items-center gap-8 tracking-wide">
			<a
				href="/lobby"
				class="rounded-full border-2 border-rose-500 bg-rose-500 px-4 py-2 font-general font-semibold text-white hover:brightness-125">
				Create Room
			</a>
			<a
				href="#features"
				class="rounded-full border-2 border-stone-500 bg-stone-50 px-4 py-2 font-general font-semibold text-stone-600 hover:brightness-125 dark:border-stone-500 dark:bg-stone-800 dark:text-stone-200">
				Learn More
			</a>
		</div>

		<div class="mt-16 pb-8">
			<p class="text-sm text-stone-500 dark:text-stone-300">With support for playing music from:</p>
			<div class="mt-4 flex items-center justify-center gap-8">
				<img
					class="h-6 opacity-70 invert dark:opacity-90 dark:invert-0"
					src="/spotify-white.png"
					width={80}
					height={24}
					alt="Spotify" />
				<img
					class="h-6 scale-75 opacity-70 invert dark:opacity-90 dark:invert-0"
					src="/youtube-white.png"
					width={108}
					height={18}
					alt="YouTube" />
			</div>
		</div>
	</div>
</header>
<footer class="border-t border-stone-100 bg-white dark:border-stone-700 dark:bg-stone-900">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 p-8 text-center text-sm text-stone-500 dark:text-stone-400 md:flex-row md:justify-between">
		<div class="flex items-center gap-1">
			<h3 class="font-straker text-xl font-medium tracking-wide text-stone-700 dark:text-stone-200">
				crowdq<span class="text-orange-500">.</span>fm
			</h3>
			<span>from</span>
			<span>☀️</span>
			<span class="font-general font-semibold tracking-wide">Suncoast Software Co.</span>
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
		min-height: 90vh;
	}
</style>
