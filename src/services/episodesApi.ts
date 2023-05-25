import { EpisodesApi } from '../types/episodesTypes'

export const fetchEpisodes = async (id: string): Promise<EpisodesApi> => {
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`)}`)
  if (res.ok) {
    return res.json()
  } else throw new Error('Network response was not ok')
}
