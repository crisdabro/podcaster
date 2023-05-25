import { PodcastsApi } from '../types/podcastsTypes'
import axios from 'axios'

export const fetchPodcasts = async (): Promise<PodcastsApi> => {
  const res = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
  return res.data
}
