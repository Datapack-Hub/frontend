// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	interface Platform {
		env: {
			COUNTER: DurableObjectNamespace;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache }
	}
}

declare module 'sveltejs-tippy';
declare module 'typewriter-effect'

declare type User = {
	id: number,
	username: string,
	bio: string,
	role: string,
	profile_icon: string
}