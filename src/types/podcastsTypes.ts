export interface PodcastsApi {
  feed: {
    entry: []
  } ;
}

export interface Podcast {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  name: string;
  'im:artist': {
    label: string;
  };
  'im:image': {
    label: string;
  }[];
  'im:name': {
    label: string;
  };
  summary: {
    label: string;
  };

}
