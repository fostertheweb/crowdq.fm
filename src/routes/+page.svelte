<script lang="ts">
	import Player from '$lib/components/dummy/Player.svelte';
	import TrackCard from '$lib/components/dummy/TrackCard.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';

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

<div class="bg-gradient-to-br from-stone-50 to-rose-50 p-8 dark:from-stone-950 dark:to-rose-950">
	<nav class="mx-auto flex w-full max-w-5xl items-center justify-between pb-8">
		<h3 class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-white">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>

		<div></div>
	</nav>
	<header class="mx-auto flex max-w-5xl flex-col justify-center">
		<h1 class="font-general text-4xl font-semibold text-rose-950 dark:text-stone-100">
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
<section class="border-t-4 border-rose-100 p-8">
	<div class="mx-auto flex w-full max-w-5xl justify-center gap-16 py-16">
		<div class="cq-tracks w-1/2 rounded bg-white p-2 shadow">
			{#each tracks as track}
				<TrackCard item={track.item} listener={track.listener} />
			{/each}
		</div>
		<div class="w-1/2 space-y-4 text-left">
			<h3 class="font-general text-3xl font-semibold text-stone-700">Craft the Queue</h3>
			<p class="text-stone-600">
				Paneer cheesy grin st. agur blue cheese. Chalk and cheese taleggio brie monterey jack
				stilton halloumi feta cream cheese. St. agur blue cheese babybel jarlsberg cauliflower
				cheese brie manchego goat smelly cheese. Camembert de normandie manchego fromage cheese on
				toast when the cheese comes out everybody's happy squirty cheese cheesy grin ricotta.
				Squirty cheese cream cheese queso say cheese.
			</p>
		</div>
	</div>
</section>
<section
	class="border-t-4 border-rose-100 bg-gradient-to-br from-rose-50 to-stone-50 p-8 dark:from-rose-950 dark:to-stone-950">
	<div class="mx-auto flex w-full max-w-5xl justify-center gap-16 py-16">
		<div class="w-1/2 space-y-4 text-left">
			<h3 class="font-general text-3xl font-semibold text-rose-900">Listen Together</h3>
			<p class="text-rose-950">
				Caerphilly cheese strings macaroni cheese. Bavarian bergkase cheeseburger monterey jack hard
				cheese stinking bishop cheeseburger fromage frais squirty cheese. Cheese and wine croque
				monsieur bocconcini boursin cheese on toast macaroni cheese ricotta cottage cheese. Pepper
				jack swiss monterey jack feta manchego roquefort boursin.
			</p>
		</div>
		<div class="relative">
			<div
				class="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-[#2485a1]/30 mix-blend-multiply blur-2xl" />
			<div
				class="absolute -right-8 -top-4 h-72 w-72 rounded-full bg-[#a81922]/20 mix-blend-multiply blur-2xl" />
			<div
				class="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#c38497]/30 mix-blend-multiply blur-2xl" />
			<Player />
		</div>
	</div>
</section>
<section>
	<!-- share play queue -->
</section>
<footer class="border-t-2 border-stone-100 bg-white p-8 dark:bg-stone-900">
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

	.cq-tracks {
		width: 480px;
	}
</style>
