import { PUBLIC_YOUTUBE_API_KEY } from '$env/static/public';

export async function getVideoById(id: string) {
	const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
	const params = new URLSearchParams({
		id,
		part: 'snippet,contentDetails',
		key: PUBLIC_YOUTUBE_API_KEY
	});

	url.search = params.toString();

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const list: YouTubeVideoList = await response.json();
	const video = list.items[0];

	return video;
}

export async function getVideoFromLink(input: string) {
	const videoId = extractIdFromUrl(input);
	const video = await getVideoById(videoId);
	console.log(video);
	return video;
}

function extractIdFromUrl(url: string) {
	// Example YouTube URLs
	// https://youtu.be/x4RXNO9oaS0
	// https://youtu.be/x4RXNO9oaS0?si=0pB9zrnt-pQ-tccX
	// https://www.youtube.com/watch?v=x4RXNO9oaS0&pp=ygUKZnJlZCBhZ2Fpbg%3D%3D

	if (url.includes('youtube.com')) {
		const _url = new URL(url);
		const videoId = _url.searchParams.get('v');

		if (!videoId) {
			throw new Error('Invalid YouTube Link');
		}

		return videoId;
	}

	const parts = url.split('/');
	const tail = parts[parts.length - 1];

	if (tail.includes('?')) {
		const params = tail.split('?');
		return params[0];
	}

	return tail;
}

export function convertISO8601ToMs(duration: string): number {
	const time_extractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i;
	const extracted = time_extractor.exec(duration);

	if (extracted) {
		const days = parseInt(extracted[1], 10) || 0;
		const hours = parseInt(extracted[2], 10) || 0;
		const minutes = parseInt(extracted[3], 10) || 0;
		const seconds = parseInt(extracted[4], 10) || 0;
		return days * 24 * 3600 * 1000 + hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
	}

	return 0;
}

export type YouTubeID = {
	kind: string;
	videoId: string;
};

export type YouTubeThumbnail = {
	url: string;
	width: number;
	height: number;
};

export type YouTubeThumbnails = {
	default: YouTubeThumbnail;
	medium: YouTubeThumbnail;
	high: YouTubeThumbnail;
	standard: YouTubeThumbnail;
	maxres: YouTubeThumbnail;
};

export type YouTubeVideoSnippet = {
	title: string;
	thumbnails: YouTubeThumbnails;
};

export type YouTubeVideoContentDetails = {
	duration: string;
};

export type YouTubeVideo = {
	id: string;
	snippet: YouTubeVideoSnippet;
	contentDetails: YouTubeVideoContentDetails;
};

export type YouTubeVideoList = {
	items: YouTubeVideo[];
};
