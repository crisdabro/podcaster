import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import podcastsReducer from './podcastsSlice'
import episodesReducer from './episodesSlice'

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    episodesCatalog: episodesReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
