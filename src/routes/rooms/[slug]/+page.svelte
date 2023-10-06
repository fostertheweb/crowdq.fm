<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createDialog, melt } from '@melt-ui/svelte';
	import mobile from 'is-mobile';
	import { playQueue } from '$lib/stores/queue';
	import { Spotify } from '$lib/spotify';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import Player from '$lib/components/Player.svelte';
	import AddTrackDialog from '$lib/components/AddTrackDialog.svelte';
	import ListenerStack from '$lib/components/ListenerStack.svelte';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import JoinButton from '$lib/components/JoinButton.svelte';
	import HostDetails from '$lib/components/HostDetails.svelte';
	import { createDatabase, createUser, itemsTableToCollection, store } from '$lib/db';
	import { createPartySocket } from '$lib/party';
	import { handleDrop } from '$lib/drag-events';

	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';
	import type PartySocket from 'partysocket';
	import IconSliders from '$lib/components/icons/IconSliders.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { currentQueueItem } from '$lib/stores/player';
	import IconEyeRoll from '$lib/components/icons/IconEyeRoll.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';

	export let data;

	let user: UserProfile | null = data.user;
	let hasJoined = false;
	let party: PartySocket;
	let tableListenerId: string;
	let isMobile = false;

	$: currentIndex = $playQueue.indexOf($currentQueueItem!);

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	onMount(async () => {
		const storedHasJoined = localStorage.getItem('cq-join');
		hasJoined = storedHasJoined && parseInt(storedHasJoined) === 1 ? true : false;
		isMobile = mobile();
		party = createPartySocket($page.params.slug);
		await createDatabase(party);

		$playQueue = itemsTableToCollection(store.getTable('items'));

		if (!user && hasJoined) {
			user = await Spotify.currentUser.profile();
		}

		if (user) {
			store.setRow('listeners', user.id, createUser(user, true));
		}

		tableListenerId = store.addTableListener('items', () => {
			$playQueue = itemsTableToCollection(store.getTable('items'));
		});
	});

	onDestroy(() => {
		store.delListener(tableListenerId);
	});
</script>

<svelte:document on:drop|preventDefault={handleDrop} on:dragover|preventDefault />

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 pb-0 dark:bg-stone-900">
	<div
		class="left-0 top-0 z-30 hidden h-screen w-screen bg-stone-900 bg-opacity-30 p-4 backdrop-blur-sm">
		<div
			class="flex h-full w-full items-center justify-center rounded border-4 border-dashed border-stone-200">
			<div class="font-general text-2xl font-semibold tracking-wide text-stone-100">
				<div class="flex flex-col items-center gap-2">
					<span>Add to Queue</span>
				</div>
			</div>
		</div>
	</div>

	<div class="cq-container flex w-full flex-col gap-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
				crowdq<span class="text-orange-500">.</span>fm
			</h3>

			{#if user}
				<CurrentUser {user} />
			{:else}
				<!-- if mobile then show login -->
				<JoinButton {isMobile} />
			{/if}
		</header>

		<Divider />

		<div class="flex items-center justify-between">
			{#if data.isHost}
				<button
					class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
					<IconSliders />
					<span class="font-general font-medium tracking-wide">Settings</span>
				</button>
			{:else}
				<HostDetails room={data.room} />
			{/if}

			<div class="flex items-center gap-2">
				{#if !isMobile}
					<ListenerStack />
				{/if}
				<ShareButton />
			</div>
		</div>

		{#if !isMobile}
			<Divider />

			<Player />
		{/if}

		<Divider />

		<div class="flex items-center justify-between">
			<h2
				class="font-general text-2xl font-semibold tracking-wide text-stone-600 dark:text-stone-300">
				Queue
			</h2>

			{#if !isMobile}
				<button
					use:melt={$trigger}
					class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
					<IconPlus />
					<span class="font-general font-medium tracking-wide">Add</span>
				</button>
				<div use:melt={$portalled}>
					{#if $open}
						<AddTrackDialog {title} {content} {description} {overlay} {close} />
					{/if}
				</div>
			{:else}
				<button
					class="flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 text-sm text-white hover:text-white hover:brightness-125 dark:bg-green-600 dark:text-white">
					<IconPlay />
					<span class="font-general font-medium tracking-wide">Play in Spotify</span>
				</button>
			{/if}
		</div>

		<div class="space-y-2 overflow-y-scroll pb-8">
			{#if $playQueue.length > 0}
				{#each $playQueue.slice(currentIndex + 1) as item}
					<TrackCard {item} />
				{/each}
				<div class="text-center text-xs text-stone-400">
					{$playQueue.length} songs, {$playQueue.reduce((d, t) => d + t.duration, 0)}
				</div>
			{:else}
				<div
					class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-8 text-stone-500">
					<IconEyeRoll />
					<span>No songs in queue</span>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>
