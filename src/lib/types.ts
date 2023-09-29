export type Room = {
	id?: string;
	slug: string;
	imageUrl: string | null;
	hostedBy: string | null;
	options?: RoomOptions | null;
};

export enum RoomOption {
	ON = 'ON',
	OFF = 'OFF'
}

export type RoomOptions = {
	requests?: RoomOption | null;
};

export type QueueItem = {
	id: string;
	name: string;
	album: string;
	artists: string;
	artwork: string;
	duration: number;
	explicit: boolean;
	provider: string;
	providerId: string;
	addedAt: number;
	addedBy: string;
	position: number;
};

export type Listener = {
	id: string;
	displayName: string | null;
	avatar: string | null;
	disconnectedAt?: Date | null;
	isHost: boolean;
};

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
