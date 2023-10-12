import PartySocket from 'partysocket';
import { PUBLIC_PARTYKIT_HOST as host } from '$env/static/public';

export function createPartySocket(slug: string) {
	return new PartySocket({
		host,
		room: slug
	});
}

export function createStoreSocket(slug: string) {
	return new PartySocket({
		host,
		room: slug,
		party: 'store'
	});
}
