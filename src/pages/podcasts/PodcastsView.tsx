import { useState, useMemo } from 'react'
import {
  GridItem,
  Grid,
  HStack,
  Stack,
  Input,
  Tag,
  Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { useAppSelector } from '../../helpers/hooks'
import { selectPodcasts } from '../../state/podcastsSlice'
import PodcastCard from '../../components/podcastCard/podcastCard'

const PodcastsView = () => {
  const { podcasts } = useAppSelector(selectPodcasts)
  const [filter, setFilter] = useState('')

  const getFilteredPodcasts = useMemo(() => {
    const filterByArtist = podcasts?.filter((podcast) =>
      podcast['im:artist'].label.toLowerCase().includes(filter.toLowerCase())
    )
    const filterByTitle = podcasts?.filter((podcast) =>
      podcast['im:name'].label.toLowerCase().includes(filter.toLowerCase())
    )
    return [...new Set(filterByArtist?.concat(filterByTitle))]
  }, [filter, podcasts])

  return (
    <Stack>
      <HStack justifyContent="end" style={{ marginTop: '24px' }}>
        <Tag size="lg" variant="solid" colorScheme="blue">
          {getFilteredPodcasts.length}
        </Tag>
        <Input
          width={248}
          placeholder="Filter podcasts..."
          onChange={(event) => setFilter(event.target.value)}
        />
      </HStack>
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {getFilteredPodcasts?.map((item, index: number) => {
          return (
            <GridItem key={index} data-testid="podcast" colSpan={1} rowSpan={1} w="200" h="208">
              <Link as={RouterLink} to={`/podcast/${item.id.attributes['im:id']}`}>
                <PodcastCard podcast={item} />
              </Link>
            </GridItem>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default PodcastsView
