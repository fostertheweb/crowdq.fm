// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserProfile;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
