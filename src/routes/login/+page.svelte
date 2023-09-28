<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte';
	import ContinueButton from '$lib/components/ContinueButton.svelte';

	export let data;
</script>

<div
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-100 p-8 dark:bg-stone-800">
	<div class="cq-container flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-600">
		<div class="flex flex-col gap-6 px-2">
			<div class="flex justify-between">
				<h3
					class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-stone-200">
					crowdq<span class="text-orange-500">.</span>fm
				</h3>
				<div class="flex items-center gap-2">
					<div
						class="font-general text-lg font-semibold tracking-wide text-stone-700 dark:text-stone-300">
						Log In
					</div>
				</div>
			</div>
		</div>

		{#if data.user}
			<div class="flex w-full flex-col gap-2">
				<ContinueButton />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<i class="fa-regular fa-exclamation-circle" />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{:else}
			<div class="flex w-full flex-col gap-2">
				<LoginButton />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<i class="fa-regular fa-exclamation-circle" />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.cq-container {
		width: 24rem;
	}
</style>
