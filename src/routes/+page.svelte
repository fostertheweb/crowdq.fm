<script lang="ts">
	import AddToSpotify from '$lib/components/dummy/AddToSpotify.svelte';
	import ListenerStack from '$lib/components/dummy/ListenerStack.svelte';
	import Player from '$lib/components/dummy/Player.svelte';
	import TrackCard from '$lib/components/dummy/TrackCard.svelte';
	import IconBrowserAdd from '$lib/components/icons/IconBrowserAdd.svelte';
	import IconDrag from '$lib/components/icons/IconDrag.svelte';
	import IconGitHub from '$lib/components/icons/IconGitHub.svelte';
	import IconListMusic from '$lib/components/icons/IconListMusic.svelte';
	import IconSliders from '$lib/components/icons/IconSliders.svelte';
	import IconSpotify from '$lib/components/icons/IconSpotify.svelte';
	import IconThumbsDown from '$lib/components/icons/IconThumbsDown.svelte';

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

<nav class="mx-auto flex w-full items-center justify-between pb-8 md:max-w-7xl">
	<h3 class="font-straker text-3xl font-medium tracking-wide text-stone-700 dark:text-white">
		crowdq<span class="text-jake-400">.</span>fm
	</h3>

	<div class="flex items-center gap-1 font-semibold text-stone-600 dark:text-white/60">
		<IconGitHub />
		<a class="hover:underline" href="https://github.com/fostertheweb/crowdq.fm">GitHub</a>
	</div>
</nav>
<header class="mx-auto flex flex-col items-center justify-center md:max-w-5xl">
	<div class="md:max-w-3/4 flex w-full flex-col items-center justify-center gap-4 py-8 text-center">
		<h1
			class="tagline font-readex-pro font-black leading-tight text-sienna-950 dark:text-stone-100">
			Realtime and collaborative play queue for <span class="text-sienna-500">now</span>
			or
			<span class="text-jake-400">later</span>
		</h1>
		<p class="subtitle mt-6 px-8 text-center font-normal text-sienna-950/80 dark:text-stone-200">
			Create a play queue with friends in realtime, or share the queue to listen later
		</p>

		<div class="mt-8 flex items-center justify-center gap-6">
			<a
				href="/lobby"
				class="flex items-center gap-2 rounded-full border border-sienna-700/30 bg-sienna-600 px-8 py-2 font-readex-pro font-medium text-white shadow-md shadow-sienna-400/30 transition ease-linear hover:brightness-110 dark:shadow-sienna-500/20">
				Get Started
			</a>
			<a
				href="#features"
				class="text-sienna-950 underline hover:text-sienna-800 dark:text-white/80 dark:hover:text-white"
				>Learn More</a>
		</div>
	</div>
</header>

<div
	id="features"
	class="relative mx-auto grid auto-rows-auto grid-cols-2 gap-4 overflow-hidden py-8 text-stone-600 dark:text-stone-100 md:max-w-7xl md:grid-cols-4 md:overflow-visible xl:grid-cols-6 xl:grid-rows-4">
	<div
		class="col-span-2 row-span-3 rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800">
		<div
			class="w-full text-center font-readex-pro text-2xl font-bold text-stone-700 dark:text-stone-50">
			Craft the Queue
		</div>
		<p class="mt-1 text-center text-sm">Everyone gets to hear their favorite song</p>
		<div class="mt-6">
			{#each tracks as track}
				<TrackCard item={track.item} listener={track.listener} />
			{/each}
		</div>
	</div>
	<div
		class="col-span-2 row-span-2 rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-3 xl:row-start-3">
		<div class="w-full text-center font-readex-pro text-2xl font-bold">Take the Queue to Go</div>
		<div class="mt-8 flex gap-8">
			<div class="w-1/2">
				<p class="text-sm">
					Send the queue to any of your Spotify devices to listen wherever and whenver
				</p>
				<div
					class="mt-2 h-fit w-fit rounded-full bg-stone-200 px-2 py-1 text-xs text-stone-500 dark:bg-stone-700 dark:text-stone-300">
					Spotify Only
				</div>
			</div>
			<AddToSpotify />
		</div>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-1 xl:row-start-4">
		<div class="flex h-8 w-full justify-center">
			<ListenerStack />
		</div>
		<p class="mt-2 text-sm">See who added which songs to the queue</p>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-2 xl:row-start-4">
		<div class="flex h-8 items-center justify-center gap-2 text-xl dark:text-stone-200">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full bg-jake-100 text-jake-600 dark:bg-jake-800 dark:text-jake-400">
				<IconThumbsDown lg />
			</div>
		</div>
		<p class="mt-2 text-sm">Vote to skip a song when someone adds a flop to the queue</p>
	</div>
	<div
		class="relative col-span-2 row-span-3 overflow-hidden rounded border border-stone-500/20 bg-white p-4 pb-10 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-5 xl:row-start-1 xl:pb-8">
		<div
			class="mt-4 w-full text-center font-readex-pro text-3xl font-bold text-stone-700 dark:text-stone-100">
			Listen Together
		</div>
		<p class="mt-1 text-center text-sm">Enjoy the harmonious magic of synchronized playback</p>
		<div class="ml-[40px] mt-10 w-[480px]">
			<div class="cq-blobs relative">
				<div
					class="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-[#2485a1] bg-opacity-20 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
				<div
					class="absolute -right-8 -top-4 h-72 w-72 rounded-full bg-[#a81922] bg-opacity-10 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
				<div
					class="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#c38497] bg-opacity-20 mix-blend-multiply blur-2xl dark:mix-blend-normal" />
				<Player />
			</div>
		</div>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-3">
		<p class="flex h-8 items-center justify-center font-readex-pro font-medium dark:text-stone-200">
			&#8984; + C, &#8984; + V
		</p>
		<p class="mt-2 text-sm">Copy and paste a Spotify song link or YouTube video URL</p>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-6 xl:row-start-4">
		<div class="flex h-8 items-center justify-center gap-2 text-xl dark:text-stone-200">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full bg-jake-100 text-jake-600 dark:bg-jake-800 dark:text-jake-400">
				<IconSliders lg />
			</div>
		</div>
		<p class="mt-2 text-sm">Tweak your room's settings to perfect your listening experience</p>
	</div>
	<div
		class="col-span-2 flex flex-col items-center justify-center rounded border border-stone-500/20 bg-white p-4 text-center shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-3 xl:row-start-2">
		<div class="flex items-center justify-center gap-2">
			<img
				class="opacity-70 invert dark:opacity-90 dark:invert-0"
				src="/images/spotify-white.png"
				width={100}
				height={24}
				alt="Spotify" />
			<span class="font-readex-pro font-medium">+</span>
			<img
				class="opacity-70 invert dark:opacity-90 dark:invert-0"
				src="/images/youtube-white.png"
				width={108}
				height={18}
				alt="YouTube" />
		</div>

		<p class="mt-4 text-sm">Mix Spotify and YouTube for the perfect playlist</p>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-4">
		<div class="flex h-8 items-center justify-center gap-2 text-xl dark:text-stone-200">
			<IconSpotify />
			<IconDrag />
			<IconBrowserAdd />
		</div>
		<p class="mt-2 text-sm">Drag and drop songs from Spotify or YouTube into the play queue</p>
	</div>
	<div
		class="rounded border border-stone-500/20 bg-white p-4 text-sm shadow-md shadow-black/5 dark:border-stone-700/60 dark:bg-stone-800 xl:col-start-5 xl:row-start-4">
		<div class="flex h-8 items-center justify-center gap-2 text-xl dark:text-stone-200">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full bg-sienna-100 text-sienna-600 dark:bg-sienna-800 dark:text-sienna-300">
				<IconListMusic md />
			</div>
		</div>
		<p class="mt-2">Save the queue as a playlist to your Spotify library</p>
	</div>

	<div
		class="absolute left-[5%] top-[5%] -z-10 h-[480px] w-[600px] rounded-full bg-sienna-400/10 mix-blend-multiply blur-3xl dark:bg-sienna-700/20 dark:mix-blend-screen" />
	<div
		class="absolute bottom-0 right-0 -z-10 h-[600px] w-[800px] rounded-full bg-jake-300/10 mix-blend-multiply blur-3xl dark:hidden dark:bg-jake-400/20 dark:mix-blend-screen" />
</div>
<footer class="p-8">
	<div
		class="mx-auto flex flex-col items-center gap-4 text-center text-sm text-stone-500 dark:text-stone-400 sm:flex-row sm:justify-between md:max-w-7xl">
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

<style lang="postcss">
	:root {
		@apply bg-gradient-to-br from-jake-50/60 to-sienna-50 p-8 dark:from-stone-900 dark:to-black;
	}

	header {
		min-height: 50vh;
	}

	.cq-blobs {
		width: 100%;
		max-width: 480px;
	}

	.tagline {
		text-wrap: balance;
		font-size: clamp(1.25rem, 4.381vw + 1rem, 3.75rem);
	}

	.subtitle {
		text-wrap: balance;
		font-size: clamp(0.5rem, 0.842vw + 0.75rem, 1.25rem);
	}
</style>
