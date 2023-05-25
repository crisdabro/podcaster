import { useEffect, useState } from 'react'
import {
  VStack,
  HStack
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Podcast } from '../../types/podcastsTypes'
import { useAppSelector } from '../../helpers/hooks'
import { selectPodcasts } from '../../state/podcastsSlice'
import PodcastDetailCard from '../../components/podcastDetailCard/podcastDetailCard'

const PodcastDetail = () => {
  const { podcasts } = useAppSelector(selectPodcasts)
  const routeParams = useParams()

  const [podcast, setPodcast] = useState<Podcast>()

  useEffect(() => {
    const res = podcasts?.find(
      (podcast) => podcast.id.attributes['im:id'] === routeParams.podcastId
    )
    setPodcast(res)
  }, [routeParams.id, podcasts])

  return (
    <HStack justifyContent="space-between" alignItems="start">
      <PodcastDetailCard podcast={podcast} />
      <VStack style={{ width: '100%' }} alignContent="start" alignItems="start">
      </VStack>
    </HStack>
  )
}

export default PodcastDetail
