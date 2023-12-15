<script lang="ts">
	export let name: string;
</script>

<a
	href="/lobby"
	class="leading flex w-full items-center justify-center gap-2 rounded-md bg-[#1cd760] px-6 py-3 text-center font-readex-pro text-base font-semibold text-black shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105 dark:shadow-[#1cd760]/20">
	<i class="fa-brands fa-spotify" />
	<span>Continue as {name}</span>
</a>
