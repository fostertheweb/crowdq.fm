<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createDialog, melt } from '@melt-ui/svelte';
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
	import { createDatabase, store } from '$lib/db';
	import { createPartySocket } from '$lib/party';
	import { handleDrop } from '$lib/drag-events';

	import type { UserProfile } from '@spotify/web-api-ts-sdk';
	import type PartySocket from 'partysocket';

	export let data;

	let user: UserProfile | null = data.user;
	let party: PartySocket;
	let tableListenerId: string;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	onMount(async () => {
		party = createPartySocket($page.params.slug);
		await createDatabase(party);

		if (!user) {
			user = await Spotify.currentUser.profile();
		}

		tableListenerId = store.addTableListener('items', () => {
			$playQueue = Object.entries(store.getTable('items')).map(([id, item]) => {
				return { id, ...item };
			});
		});
	});

	onDestroy(() => {
		store.delListener(tableListenerId);
	});
</script>

<svelte:document on:drop|preventDefault={handleDrop} on:dragover|preventDefault />

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 pb-0 dark:bg-stone-900">
	<div
		class="left-0 top-0 z-30 hidden h-screen w-screen bg-stone-900 bg-opacity-30 p-4 backdrop-blur-sm"
	>
		<div
			class="flex h-full w-full items-center justify-center rounded border-4 border-dashed border-stone-200"
		>
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
				<JoinButton />
			{/if}
		</header>

		<Divider />

		<div class="flex items-center justify-between">
			<!-- TODO: show host controls instead if host == true -->
			<HostDetails />
			<ListenerStack />
		</div>

		<Divider />

		<Player />

		<Divider />

		<div class="flex items-center justify-between">
			<h2
				class="font-general text-2xl font-semibold tracking-wide text-stone-600 dark:text-stone-300"
			>
				Queue
			</h2>
			<button
				use:melt={$trigger}
				class="h-8 w-8 rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
				><i class="fa-regular fa-plus-circle fa-lg" />
			</button>
			<div use:melt={$portalled}>
				{#if $open}
					<AddTrackDialog {title} {content} {description} {overlay} {close} />
				{/if}
			</div>
		</div>

		<div class="space-y-2 overflow-y-scroll pb-8">
			{#each $playQueue as item}
				<TrackCard {item} />
			{/each}
		</div>
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>
