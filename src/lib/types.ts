export type Room = {
	slug: string;
	imageUrl: string;
	hostId: string;
	hostedBy: string;
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
	providerId: string;
	displayName: string;
	avatar: string | null;
	disconnectedAt?: Date | null;
	isHost: boolean;
};

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
