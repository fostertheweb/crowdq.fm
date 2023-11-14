<script lang="ts">
	export let name: string;
</script>

<a
	href="/lobby"
	class="leading font-readex-pro flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105">
	<i class="fa-brands fa-spotify" />
	<span>Continue as {name}</span>
</a>
