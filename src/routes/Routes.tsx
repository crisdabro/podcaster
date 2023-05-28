import { Routes as RouterRoutes, Route } from 'react-router-dom';
import PodcastsView from '../pages/podcasts/PodcastsView';
import PodcastDetail from '../pages/PodcstsDetail/PodcastDetail';
import EpisodeDetail from '../pages/episodes/EpisodeDetail';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<PodcastsView />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<EpisodeDetail />}
      />
    </RouterRoutes>
  );
};

export default Routes;
