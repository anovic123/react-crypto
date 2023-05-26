import { configureStore } from '@reduxjs/toolkit';
import { coinsApi } from '../api';

const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;