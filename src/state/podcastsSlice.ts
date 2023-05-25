import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Podcast } from '../types/podcastsTypes'
import { fetchPodcasts } from '../services/podcastsApi'
import { STATUS } from '../helpers/constants'

export interface PodcastsState {
  podcasts: Array<Podcast>;
  status: string;
}

const initialState: PodcastsState = {
  podcasts: [],
  status: STATUS.IDLE
}

export const getPodcasts = createAsyncThunk(
  'podcasts/fetchPodcasts',
  fetchPodcasts
)

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPodcasts.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(getPodcasts.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.podcasts = action.payload.feed.entry
      })
      .addCase(getPodcasts.rejected, (state) => {
        state.status = STATUS.FAILED
      })
  }
})

export const selectPodcasts = (state: RootState) => state.podcasts

export default podcastsSlice.reducer
