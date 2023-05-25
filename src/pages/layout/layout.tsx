import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import { getPodcasts, selectPodcasts } from '../../state/podcastsSlice'
import PodcastsView from '../podcasts/PodcastsView'
import PodcastDetail from '../podcasts/PodcastDetail'
import EpisodeDetail from '../episodes/EpisodeDetail'
import Header from '../../components/header/Header'

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
      <Routes>
        <Route path="/" element={<PodcastsView />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetail />}
        />
      </Routes>
    </>
  )
}

export default Home
