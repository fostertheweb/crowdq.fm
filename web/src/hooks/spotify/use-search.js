import axios from "axios";
import { useQuery } from "react-query";
import { useGetSpotifyCredentials } from "hooks/spotify/use-spotify";

const { REACT_APP_SPOTIFY_API_URL: SPOTIFY_API_URL } = process.env;

export function useSearch(query) {
  const { data: credentials } = useGetSpotifyCredentials();

  return useQuery(credentials && ["search", query], async () => {
    if (query !== "") {
      const {
        data: {
          tracks: { items },
        },
      } = await axios.get(
        `${SPOTIFY_API_URL}/search?query=${query}&type=track&market=US`,
        {
          headers: {
            Authorization: `Bearer ${credentials.access_token}`,
          },
        },
      );
      return items;
    }

    return [];
  });
}
