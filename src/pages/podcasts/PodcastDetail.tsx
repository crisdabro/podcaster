import { useEffect, useState } from 'react'
import {
  VStack,
  HStack
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Podcast } from '../../types/podcastsTypes'
import { useAppSelector, useAppDispatch } from '../../helpers/hooks'
import { selectPodcasts } from '../../state/podcastsSlice'
import { selectEpisodes, getEpisodes } from '../../state/episodesSlice'
import PodcastDetailCard from '../../components/podcastDetailCard/podcastDetailCard'
import EpisodesCounter from '../../components/episodesCounter/EpisodesCounter'
import EpisodesTable from '../../components/episodesTable/EpisodesTable'
import { Episode } from '../../types/episodesTypes'

const PodcastDetail = () => {
  const dispatch = useAppDispatch()
  const { podcasts } = useAppSelector(selectPodcasts)
  const { episodesCatalog } = useAppSelector(selectEpisodes)
  const routeParams = useParams()

  const [podcast, setPodcast] = useState<Podcast>()
  const [podcastEpisodes, setPodcastEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    const res = podcasts?.find(
      (podcast) => podcast.id.attributes['im:id'] === routeParams.podcastId
    )
    setPodcast(res)
    const exist = episodesCatalog.find(
      ({ collectionId }) => collectionId === Number(routeParams?.podcastId)
    )
    exist
      ? setPodcastEpisodes(exist.episodes)
      : dispatch(getEpisodes(routeParams?.podcastId!))

    const interval = setInterval(() => {
      dispatch(getEpisodes(routeParams?.podcastId!))
    }
    , 86400000)
    return () => clearInterval(interval)
  }, [routeParams.id, podcasts, episodesCatalog])

  return (
    <HStack justifyContent="space-between" alignItems="start">
      <PodcastDetailCard podcast={podcast} />
      <VStack style={{ width: '100%' }} alignContent="start" alignItems="start">
        <EpisodesCounter value={podcastEpisodes?.length} />
        {podcastEpisodes.length > 0 && (
          <EpisodesTable
            podcastId={podcast?.id.attributes['im:id']!}
            episodes={podcastEpisodes}
          />
        )}
      </VStack>
    </HStack>
  )
}

export default PodcastDetail
