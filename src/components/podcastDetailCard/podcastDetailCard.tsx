import {
  Card,
  StackDivider,
  CardBody,
  Heading,
  Box,
  Text,
  Image,
  VStack, Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'
import { Podcast } from '../../types/podcastsTypes';
import './index.css';

type Props = {
  podcast: Podcast | undefined;
};

const PodcastDetailCard = ({ podcast }: Props) => {
  const {
    'im:name': name,
    'im:artist': artist,
    'im:image': image,
    summary,
  } = podcast || {};

  return (
    <Card className="card-detail">
      <CardBody>
        <VStack divider={<StackDivider />} spacing="4">
          <Box>
            <Link
              as={RouterLink}
              to={`/podcast/${podcast?.id.attributes['im:id']}`}
            >
              <Image src={image?.[2].label} borderRadius="lg" />
            </Link>
          </Box>
          <Box className="box-detail">
            <Link
              as={RouterLink}
              to={`/podcast/${podcast?.id.attributes['im:id']}`}
            >
              <Heading size="xs">{name?.label}</Heading>
              <Text pt="2" as="i" fontSize="sm">
                By {artist?.label}
              </Text>
            </Link>
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
  );
};

export default PodcastDetailCard;
