<script lang="ts">
	import IconSpotify from '$lib/components/icons/IconSpotify.svelte';

	export let name: string;
</script>

<a
	href="/lobby"
	class="leading mx-auto flex w-auto items-center justify-center gap-2 rounded-full bg-[#1cd760] px-16 py-3 text-center font-readex-pro text-base font-medium text-black shadow-md shadow-[#1cd760]/30 filter transition ease-linear hover:brightness-105 dark:shadow-[#1cd760]/20">
	<IconSpotify />
	<span>Continue as {name}</span>
</a>
