import { configureStore } from '@reduxjs/toolkit';

import { coinsApi } from '../api/coinApi';
import { newsApi } from '../api/newsApi';

import favoriteSlice from './slice/favorite';

const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    favorite: favoriteSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware, newsApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;