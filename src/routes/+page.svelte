<script lang="ts">
	import HeroImage from '$lib/components/HeroImage.svelte';
	import AddToSpotify from '$lib/components/dummy/AddToSpotify.svelte';
	import ListenerStack from '$lib/components/dummy/ListenerStack.svelte';
	import Player from '$lib/components/dummy/Player.svelte';
	import TrackCard from '$lib/components/dummy/TrackCard.svelte';
	import IconBrowserAdd from '$lib/components/icons/IconBrowserAdd.svelte';
	import IconDrag from '$lib/components/icons/IconDrag.svelte';
	import IconGitHub from '$lib/components/icons/IconGitHub.svelte';
	import IconSpotify from '$lib/components/icons/IconSpotify.svelte';

	const tracks = [
		{
			item: {
				artwork: 'https://i.scdn.co/image/ab67616d0000b273d03c8d74d7f963dee63ef893',
				name: 'On My Mama',
				artists: 'Victoria Monét',
				explicit: false
			},
			listener: {
				avatar:
					'https://userstock.io/data/wp-content/uploads/2017/07/ahmed-saffu-201122-300x300.jpg'
			}
		},

		{
			item: {
				artwork: 'https://i.scdn.co/image/ab67616d0000b27355e00e99a232c2117de6c00a',
				name: 'Scream Drive Faster',
				artists: 'LAUREL',
				explicit: false
			},
			listener: {
				avatar:
					'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-26939-1-300x300.jpg'
			}
		},
		{
			item: {
				artwork: 'https://i.scdn.co/image/ab67616d0000b2738128b3a01e0246795dfab1a2',
				name: 'Desire',
				artists: 'Cleo Sol',
				explicit: false
			},
			listener: {
				avatar:
					'https://userstock.io/data/wp-content/uploads/2017/07/yegide-matthews-60888-300x300.jpg'
			}
		},

		{
			item: {
				artwork: 'https://i.scdn.co/image/ab67616d0000b273d87c524bbf1aa68ce698da29',
				name: 'Got Me Started',
				artists: 'Troye Sivan',
				explicit: false
			},
			listener: {
				avatar:
					'https://userstock.io/data/wp-content/uploads/2017/09/yingchou-han-261533-300x300.jpg'
			}
		},
		{
			item: {
				artwork: 'https://i.scdn.co/image/ab67616d0000b273ebc5a9d869143c4def6771e9',
				name: 'NATURAL',
				artists: 'Isaiah Falls, Tamae, Icee Red'
			},
			listener: {
				avatar:
					'https://userstock.io/data/wp-content/uploads/2017/07/william-stitt-111007-300x300.jpg'
			}
		}
	];
</script>

<div
	class="to-sienna-50 dark:to-sienna-950 from-jake-50/60 bg-gradient-to-br p-8 dark:from-stone-950">
	<nav class="mx-auto flex w-full max-w-5xl items-center justify-between pb-8">
		<h3 class="font-straker text-3xl font-medium tracking-wide text-stone-700 dark:text-white">
			crowdq<span class="text-jake-400">.</span>fm
		</h3>

		<div class="flex items-center gap-1 font-semibold text-stone-600 dark:text-white/60">
			<IconGitHub />
			<a class="hover:underline" href="https://github.com/fostertheweb/crowdq.fm">GitHub</a>
		</div>
	</nav>
	<header class="mx-auto flex max-w-5xl flex-col justify-center">
		<div class="flex flex-col-reverse items-center justify-between md:flex-row md:gap-8">
			<div class="md:max-w-1/2 w-full">
				<h1 class="text-sienna-950 font-readex-pro text-4xl font-black dark:text-stone-100">
					Collaborative play queue
					<br class="hidden sm:block" />for <span class="text-sienna-500">now</span>
					or
					<span class="text-jake-400">later</span>
				</h1>
				<p class="text-sienna-950/80 mt-8 text-base font-normal dark:text-stone-200">
					Share your favorite tunes in real-time with friends,<br />making music a group effort.
				</p>

				<div class="mt-8 flex items-center gap-6">
					<a
						href="/lobby"
						class="border-sienna-700/30 bg-sienna-600 shadow-sienna-400/30 dark:shadow-sienna-500/20 flex items-center gap-2 rounded-full border px-8 py-2 font-readex-pro font-medium text-white shadow-md transition ease-linear hover:brightness-110">
						Get Started
					</a>
					<a
						href="#features"
						class="text-sienna-950 hover:text-sienna-800 underline dark:text-white/80 dark:hover:text-white"
						>Learn More</a>
				</div>
			</div>
			<div class="text-sienna-950 relative w-full max-w-[480px] dark:text-stone-600">
				<HeroImage />
				<div
					class="bg-sienna-400 dark:bg-sienna-700/20 absolute left-[5%] top-[5%] h-96 w-96 rounded-full bg-opacity-20 mix-blend-multiply blur-2xl dark:mix-blend-screen" />
				<div
					class="bg-jake-400 dark:bg-jake-200/10 absolute bottom-0 right-0 h-72 w-72 rounded-full bg-opacity-10 mix-blend-multiply blur-2xl dark:mix-blend-screen" />
			</div>
		</div>
	</header>
</div>
<section id="features" class="border-sienna-100 dark:border-sienna-900 border-t-4 p-8">
	<div
		class="mx-auto flex w-full max-w-5xl flex-col-reverse justify-center gap-16 py-16 lg:flex-row">
		<div
			class="cq-tracks h-fit rounded border bg-white p-2 shadow shadow-stone-500/10 dark:border-stone-700/60 dark:bg-stone-800 lg:w-1/2">
			{#each tracks as track}
				<TrackCard item={track.item} listener={track.listener} />
			{/each}
		</div>
		<div class="text-left lg:w-1/2">
			<h3 class="font-readex-pro text-3xl font-semibold text-stone-700 dark:text-stone-300">
				Craft the Queue
			</h3>
			<div class="cq-feature-row mt-6 flex gap-4 text-stone-600 dark:text-stone-400">
				<div
					class="w-1/2 space-y-2 rounded border border-stone-200 bg-stone-100 p-4 dark:border-stone-800 dark:bg-stone-950/60">
					<div class="-ml-2 flex h-8 scale-90 items-center gap-1">
						<img
							class="opacity-70 invert dark:opacity-90 dark:invert-0"
							src="/images/spotify-white.png"
							width={80}
							height={24}
							alt="Spotify" />
						<span class="font-readex-pro font-medium">+</span>
						<img
							class="-ml-2.5 scale-75 opacity-70 invert dark:opacity-90 dark:invert-0"
							src="/images/youtube-white.png"
							width={108}
							height={18}
							alt="YouTube" />
					</div>
					<p class="text-sm">Mix Spotify and YouTube for the perfect playlist</p>
				</div>
				<div
					class="w-1/2 space-y-2 rounded border border-stone-200 bg-stone-100 p-4 dark:border-stone-800 dark:bg-stone-950/60">
					<div class="flex h-8 items-center gap-2 text-xl dark:text-stone-200">
						<IconSpotify />
						<IconDrag />
						<IconBrowserAdd />
					</div>
					<p class="text-sm">Drag and drop songs from Spotify or YouTube into queue</p>
				</div>
			</div>
			<div class="cq-feature-row mt-4 flex gap-4 text-stone-600 dark:text-stone-400">
				<div
					class="w-1/2 space-y-2 rounded border border-stone-200 bg-stone-100 p-4 dark:border-stone-800 dark:bg-stone-950/60">
					<p class="flex h-8 items-center font-readex-pro font-medium dark:text-stone-200">
						&#8984; + C, &#8984; + V
					</p>
					<p class="text-sm">Copy and paste a Spotify song link or YouTube video URL</p>
				</div>
				<div
					class="w-1/2 space-y-2 rounded border border-stone-200 bg-stone-100 p-4 dark:border-stone-800 dark:bg-stone-950/60">
					<div class="h-8">
						<ListenerStack />
					</div>
					<p class="text-sm">See who added which songs to the queue</p>
				</div>
			</div>
		</div>
	</div>
</section>
<section
	class="border-sienna-100 from-sienna-50 dark:border-sienna-900 dark:from-sienna-950 to-jake-50/40 border-t-4 bg-gradient-to-br p-8 dark:to-stone-950">
	<div class="mx-auto flex w-full max-w-5xl flex-col justify-center gap-16 py-16 lg:flex-row">
		<div class="space-y-4 text-left lg:w-1/2">
			<h3 class="text-sienna-900 dark:text-sienna-50 font-readex-pro text-3xl font-semibold">
				Listen Together
			</h3>
			<p class="text-sienna-950 dark:text-sienna-100">
				Create a shared queue, invite your favorite people, and enjoy the harmonious magic of
				synchronized playback. Watch as the rhythm of each beat aligns perfectly, fostering a sense
				of togetherness even across distances. Whether it's a virtual party, a remote work session,
				or a cozy night in with loved ones, crowdq.fm will maintain the vibes.
			</p>
		</div>
		<div class="cq-blobs relative">
			<div
				class="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-[#2485a1] bg-opacity-30 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
			<div
				class="absolute -right-8 -top-4 h-72 w-72 rounded-full bg-[#a81922] bg-opacity-20 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
			<div
				class="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#c38497] bg-opacity-30 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
			<Player />
		</div>
	</div>
</section>
<section class="border-t-4 border-stone-200/50 p-8 dark:border-stone-800">
	<div
		class="mx-auto flex w-full max-w-5xl flex-col-reverse justify-center gap-16 py-16 lg:flex-row">
		<!-- share play queue -->
		<div class="cq-spotify-add">
			<AddToSpotify />
		</div>
		<div class="space-y-4 text-left lg:w-1/2">
			<h3 class="font-readex-pro text-3xl font-semibold text-stone-700 dark:text-stone-300">
				Take the Queue to Go
			</h3>
			<p class="text-stone-600 dark:text-stone-400">
				We can't always be in sync, but we can still share a sonic experience that will bring us
				together. When you are away from your computer or want to load up a play queue for later,
				open crowdq.fm on the go and send the queue to any Spotify device.
			</p>
			<div
				class="h-fit w-fit rounded-full bg-stone-200 px-2 py-1 text-xs text-stone-500 dark:bg-stone-700 dark:text-stone-300">
				Spotify Only
			</div>
		</div>
	</div>
</section>
<footer class="border-t-2 border-stone-100 bg-white p-8 dark:border-stone-800 dark:bg-stone-900">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center text-sm text-stone-500 dark:text-stone-400 sm:flex-row sm:justify-between">
		<div class="flex items-baseline gap-1">
			made by <a href="https://fostertheweb.com" class="underline hover:text-stone-700"
				>fostertheweb</a>
		</div>

		<div class="flex items-center gap-1 font-semibold text-stone-600 dark:text-stone-400">
			<IconGitHub />
			<a class="hover:underline" href="https://github.com/fostertheweb/crowdq.fm">GitHub</a>
		</div>
	</div>
</footer>

<style>
	header {
		min-height: 60vh;
	}

	.cq-tracks {
		width: 100%;
		max-width: 480px;
	}

	.cq-spotify-add {
		width: 100%;
		max-width: 480px;
	}

	.cq-feature-row {
		max-width: 480px;
	}

	.cq-blobs {
		width: 100%;
		max-width: 480px;
	}
</style>
