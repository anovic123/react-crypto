import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

interface FavoriteState {
  favoriteData: FavoriteItem[];
}

export interface FavoriteItem {
  id: string;
  image: string;
  description: string;
  title: string;
  price: number;
}

const initialState: FavoriteState = {
  favoriteData: JSON.parse(localStorage.getItem('favoriteData') || '[]'),
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.favoriteData.find((item: any) => item.id === action.payload.id);

      if (existingItem) {
        toast.warning('Item is already in your favorites list');
        return;
      }

      state.favoriteData.push(action.payload);
      localStorage.setItem('favoriteData', JSON.stringify(state.favoriteData));
      toast.success('Successfully added to favorites');
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteData = state.favoriteData.filter((el: any) => el.id !== action.payload);
      localStorage.setItem('favoriteData', JSON.stringify(state.favoriteData));
      toast.success('Successfully removed from favorites');
    },
    clearFavoriteList: (state) => {
      state.favoriteData = [];
      localStorage.setItem('favoriteData', JSON.stringify(state.favoriteData));
      toast.success('Successfully cleared the favorites list');
    },
  },
});

export const { addFavorite, removeFavorite, clearFavoriteList } = favoriteSlice.actions;

export default favoriteSlice.reducer;
