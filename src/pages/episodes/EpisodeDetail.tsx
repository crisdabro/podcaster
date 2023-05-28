import { useEffect, useState } from 'react'
import {
  Card,
  Text,
  VStack,
  CardHeader,
  StackDivider,
  Box,
  Heading,
  HStack,
  CardBody
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Podcast } from '../../types/podcastsTypes'
import { useAppSelector, useAppDispatch } from '../../helpers/hooks'
import { selectPodcasts } from '../../state/podcastsSlice'
import { selectEpisodes, getEpisodes } from '../../state/episodesSlice'
import PodcastDetailCard from '../../components/podcastDetailCard/podcastDetailCard'
import AudioPlayer from '../../components/audioPlayer/AudioPlayer'
import { Episode } from '../../types/episodesTypes'

const EpisodeDetail = () => {
  const dispatch = useAppDispatch()
  const { podcasts } = useAppSelector(selectPodcasts)
  const { episodesCatalog } = useAppSelector(selectEpisodes)
  const routeParams = useParams()

  const [podcast, setPodcast] = useState<Podcast>()
  const [podcastEpisode, setPodcastEpisode] = useState<Episode>()

  useEffect(() => {
    const res = podcasts?.find(
      (podcast: Podcast) =>
        podcast.id.attributes['im:id'] === routeParams.podcastId
    )
    setPodcast(res)
    const exist = episodesCatalog.find(
      ({ collectionId }) => collectionId === Number(routeParams?.podcastId)
    )
    exist
      ? setPodcastEpisode(
        exist.episodes.find(
          ({ episodeGuid }: Episode) => episodeGuid === routeParams?.episodeId
        )
      )
      : dispatch(getEpisodes(routeParams?.podcastId!))
  }, [routeParams.id, podcasts, episodesCatalog])

  return (
    <HStack justifyContent="space-between" alignItems="start" >
      <PodcastDetailCard podcast={podcast} />
      <Card marginTop="10px">
        <CardHeader >
          <Heading as="h3" size="md">
            <Text noOfLines={1}> {podcastEpisode?.trackName}</Text>
          </Heading>
        </CardHeader>
        <CardBody width="100%">
          <VStack
            divider={<StackDivider />}
            alignContent="start"
            alignItems="start"
          >
            <Box>
              <Text as="i"> {podcastEpisode?.description}</Text>
            </Box>
            <AudioPlayer src={podcastEpisode?.episodeUrl!} />
          </VStack>
        </CardBody>
      </Card>
    </HStack>
  )
}

export default EpisodeDetail
