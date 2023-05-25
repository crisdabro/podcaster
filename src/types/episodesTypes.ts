export interface Episode {
  episodeGuid: string;
  title: string;
  trackName: string;
  trackTimeMillis: number;
  releaseDate: number;
  episodeUrl: string;
  description: string;
}

export interface EpisodeCatalog {
  name: string;
  collectionId: number;
  episodes: Episode[];
}

export interface EpisodesApi {
  contents: string;
}
