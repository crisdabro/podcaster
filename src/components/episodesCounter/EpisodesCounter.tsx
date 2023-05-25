import { Card, CardHeader, Text } from '@chakra-ui/react'
import './index.css'

type Props = {
  value: number;
};

const EpisodesCounter = ({ value }: Props) => {
  return (
    <Card className='card card-counter'>
      <CardHeader>
        <Text marginLeft={5} fontWeight={900}>Episodes: {value}</Text>
      </CardHeader>
    </Card>
  )
}

export default EpisodesCounter
