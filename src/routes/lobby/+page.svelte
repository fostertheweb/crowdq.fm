<script lang="ts">
	import { token } from '../../stores/session';

	export let data;

	// set
	console.log(data);

	// check for re-join
</script>

<main />

<main
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-100 p-8 dark:bg-stone-800"
>
	<div class="cq-card flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-700">
		<div class="flex flex-col gap-4 px-2">
			<button>Create Room</button>
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
