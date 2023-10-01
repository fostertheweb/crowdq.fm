export async function load({ locals }) {
	// TODO: fetch room data from KV

	return {
		user: locals.user
	};
}
