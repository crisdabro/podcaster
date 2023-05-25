import { Divider, Text, HStack, Spinner, Link } from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'
import { STATUS } from '../../helpers/constants'

type Props = {
  status: string;
};

const Header = ({ status }: Props) => {
  return (
    <>
      <HStack justifyContent="space-between">
        <Link as={RouterLink} to={'/'}>
          <Text fontSize={20} color={'blue.400'} fontWeight={800}>
            Podcaster
          </Text>
        </Link>
        {status === STATUS.LOADING && <Spinner color={'blue.400'} />}
      </HStack>
      <Divider />
    </>
  )
}

export default Header
