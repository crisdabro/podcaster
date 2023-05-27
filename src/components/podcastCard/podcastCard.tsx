import {
  Card,
  CardHeader,
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
  podcast: Podcast;
};

const PodcastCard = ({ podcast }: Props) => {
  return (
    <Box className="box">
      <Card>
        <VStack>
          <CardHeader className="cardHeader">
            <Image
              className="image"
              borderRadius="full"
              boxSize="150px"
              src={podcast['im:image'][2].label}
              alt={podcast['im:name'].label}
            />
          </CardHeader>
          <CardBody className="cardBody">
            <Heading size="xs" textTransform="uppercase">
              <Text pt="2" fontSize="sm" noOfLines={2}>
                {podcast['im:name'].label}
              </Text>
            </Heading>
            <Text pt="2" fontSize="sm" noOfLines={1} as='i' >
              Author: {podcast['im:artist'].label}
            </Text>
          </CardBody>
        </VStack>
      </Card>
    </Box>
  )
}

export default PodcastCard
