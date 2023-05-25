import {
  Card,
  StackDivider,
  CardBody,
  Heading,
  Box,
  Text,
  Image,
  VStack
} from '@chakra-ui/react'
import { Podcast } from '../../types/podcastsTypes'
import './index.css'

type Props = {
  podcast: Podcast | undefined;
};

const PodcastDetailCard = ({ podcast }: Props) => {
  const {
    'im:name': name,
    'im:artist': artist,
    'im:image': image,
    summary
  } = podcast || {}

  return (
    <Card className="card card-detail" width={300}>
      <CardBody>
        <VStack divider={<StackDivider />} spacing="4">
          <Box>
            <Image src={image?.[2].label} borderRadius="lg" />
          </Box>
          <Box className="box-detail">
            <Heading size="xs">{name?.label}</Heading>
            <Text pt="2" as="i" fontSize="sm">
              By {artist?.label}
            </Text>
          </Box>

          <Box className="box-detail">
            <Heading size="xs">Description:</Heading>
            <Text pt="2" as="i" fontSize="sm">
              {summary?.label}
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default PodcastDetailCard
