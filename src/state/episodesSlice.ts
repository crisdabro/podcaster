import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { EpisodeCatalog, EpisodesApi, Episode } from '../types/episodesTypes'
import { fetchEpisodes } from '../services/episodesApi'
import { STATUS } from '../helpers/constants'

export interface EpisodesState {
  episodesCatalog: EpisodeCatalog[];
  status: string;
}

const initialState: EpisodesState = {
  episodesCatalog: [],
  status: STATUS.IDLE
}

export const getEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async (id: string, thunkAPI) => {
    try {
      const response: EpisodesApi = await fetchEpisodes(id)
      return response
    } catch (error: any) {
      const message: string = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEpisodes.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(getEpisodes.fulfilled, (state, action) => {
        const res = JSON.parse(action.payload.contents)
        const episode: EpisodeCatalog = res.results.shift()!
        episode.episodes = res.results.sort(
          (a: Episode, b: Episode) => a.releaseDate - b.releaseDate
        )
        const index = state.episodesCatalog.findIndex(
          (e: EpisodeCatalog) => e.collectionId === episode.collectionId
        )
        index !== -1
          ? (state.episodesCatalog[index] = episode)
          : state.episodesCatalog.push(episode)
        state.status = STATUS.IDLE
      })
      .addCase(getEpisodes.rejected, (state) => {
        state.status = STATUS.FAILED
      })
  }
})

export const selectEpisodes = (state: RootState) => state.episodesCatalog

export default episodesSlice.reducer
