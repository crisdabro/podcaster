import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import { getPodcasts, selectPodcasts } from '../../state/podcastsSlice'
import Header from '../../components/header/Header'
import Routes from '../../routes/Routes'

const Home = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectPodcasts)

  useEffect(() => {
    dispatch(getPodcasts())
    const interval = setInterval(() => {
      dispatch(getPodcasts())
    }, 86400000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header status={status} />
      <Routes />
    </>
  )
}

export default Home
