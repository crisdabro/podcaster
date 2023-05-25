import { Box } from '@chakra-ui/react'
import './index.css'

type Props = {
  src: string;
};

const AudioPlayer = ({ src }: Props) => {
  return (
    <Box className="box-audio-player">
      <audio className="audio" src={src} controls>
        <source src={src} type="audio/mpeg" />
      </audio>
    </Box>
  )
}

export default AudioPlayer
