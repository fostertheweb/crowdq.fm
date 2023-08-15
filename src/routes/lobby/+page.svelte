<script lang="ts">
	export let data;

	console.log(data);
</script>

<main />

<main
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-100 p-8 dark:bg-stone-800"
>
	<div class="cq-card flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-700">
		<div class="flex flex-col gap-4 px-2">
			<a href="/rooms/chipwheel">Create Room</a>
			<!-- <HeaderWithUser name={me.display_name} image={me.images[0].url} /> -->
			<!-- <CreateRoomForm /> -->
		</div>
	</div>
</main>

<style>
	.cq-card {
		width: 24rem;
	}
</style>
