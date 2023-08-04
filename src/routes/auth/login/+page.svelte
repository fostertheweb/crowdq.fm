<script lang="ts">
	import LoginButton from '../../../components/LoginButton.svelte';
</script>

<div
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-100 p-8 dark:bg-stone-800"
>
	<div class="flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-600">
		<div class="flex flex-col gap-6 px-2">
			<div class="flex justify-between">
				<h3
					class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-stone-200"
				>
					crowdq<span class="text-orange-500">.</span>fm
				</h3>
				<div class="flex items-center gap-2">
					<div
						class="font-general text-lg font-bold tracking-wide text-stone-700 dark:text-stone-300"
					>
						Log In
					</div>
				</div>
			</div>
		</div>

		<div class="flex w-full flex-col gap-2">
			<LoginButton />
			<div class="flex items-center justify-center gap-2 p-2 text-xs text-stone-400">
				<span>Spotify Premium required.</span>
			</div>
		</div>
	</div>
</div>
