import {
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Episode } from '../../types/episodesTypes'
import './index.css'
import { convertMsToHoursMinutesSeconds, timestampToDate } from '../../helpers/utils'

type Props = {
  podcastId: string;
  episodes: Episode[];
};

const EpisodesTable = ({ podcastId, episodes }: Props) => {
  return (
    <Card className="card-table">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {episodes.map(
              ({ episodeGuid, trackName, trackTimeMillis, releaseDate }) => (
                <Tr key={episodeGuid}>
                  <Td>
                    <Link
                      as={RouterLink}
                      to={`/podcast/${podcastId}/episode/${episodeGuid}`}
                    >
                      <Text color={'blue.400'} maxWidth={400} noOfLines={1}>
                        {trackName}
                      </Text>
                    </Link>
                  </Td>
                  <Td>{timestampToDate(releaseDate)}</Td>
                  <Td>
                    {convertMsToHoursMinutesSeconds(trackTimeMillis || 0)}
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default EpisodesTable
