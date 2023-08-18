export type Room = {
	id?: string;
	slug: string;
	imageUrl: string | null;
	hostedBy: string | null;
	options: RoomOptions | null;
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
	provider: string;
	providerId: string;
	addedAt: Date;
	position: number;
	room: string | null;
	listenerId: number | null;
};

export type Listener = {
	id: string;
	displayName: string | null;
	provider: string;
	providerId: string;
	avatar: string | null;
	disconnectedAt?: Date | null;
	isHost: boolean;
	room: string | null;
};

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface CurrentPlayback {
	status: PlayerStatus;
	position: number;
	item?: QueueItem;
}

// Spotify

export interface Playback {
	progress_ms: number | null;
	is_playing: boolean;
	item: Track | null;
}

export interface PlayerState {
	duration: number;
	position: number;
	paused: boolean;
	loading: boolean;
	track_window: TrackWindow | null;
}

export interface TrackWindow {
	current_track: Track | null;
	previous_tracks: Track[] | null;
}

type Image = {
	url: string;
	height: number;
	width: number;
};

type Album = {
	name: string;
	images: Image[];
};

type Artist = {
	name: string;
	images: Image[];
};

export type Track = {
	id: string;
	name: string;
	album: Album;
	artists: Artist[];
	duration_ms: number;
	explicit: boolean;
	uri: string;
};
