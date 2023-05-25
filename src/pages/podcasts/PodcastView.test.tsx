import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { store } from '../../state/store'
import { Provider } from 'react-redux'
import PodcastView from './PodcastsView'
import { getPodcasts } from '../../state/podcastsSlice'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { MemoryRouter } from 'react-router-dom'

const podcastsMock = {
  feed: {
    entry: [
      {
        id: { attributes: { 'im:id': '1' } },
        'im:artist': { label: 'artist' },
        'im:name': { label: 'name' },
        'im:image': [
          { label: 'image' },
          { label: 'image' },
          { label: 'image' }
        ]
      },
      {
        id: { attributes: { 'im:id': '2' } },
        'im:artist': { label: 'artist2' },
        'im:name': { label: 'name2' },
        'im:image': [
          { label: 'image' },
          { label: 'image' },
          { label: 'image' }
        ]
      }
    ]
  }
}

beforeAll(() => {
  const mock = new MockAdapter(axios)
  mock
    .onGet(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )
    .reply(200, podcastsMock)
})

describe('<PodcastView />', () => {
  test('PodcastView mounts properly', () => {
    const wrapper = render(
      <Provider store={store}>
        <PodcastView />
      </Provider>
    )
    expect(wrapper).toBeTruthy()
  })

  test('Renders fetched podcasts', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PodcastView />
        </Provider>
      </MemoryRouter>
    )

    await waitFor(async () => {
      const result = await store.dispatch(getPodcasts())
      const listItem = screen.getAllByTestId('podcast')
      expect(listItem).toHaveLength(2)
      expect(result.type).toBe('podcasts/fetchPodcasts/fulfilled')
      const podcasts = result.payload
      expect(podcasts).toEqual(podcastsMock)
    })
  })
})
