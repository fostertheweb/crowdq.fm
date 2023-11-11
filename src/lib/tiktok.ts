export async function getTikTokEmbed(videoUrl: string) {
	const url = `https://www.tiktok.com/oembed?url=${videoUrl}`;

	const response = await fetch(url);

	return await response.json();
}
