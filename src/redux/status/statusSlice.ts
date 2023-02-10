import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Status {
  showSplashScreen: boolean;
}

const initialState: Status = {
  showSplashScreen: true,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setShowSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.showSplashScreen = action.payload;
    },
  },
});

export const statusReducer = statusSlice.reducer;

export const {setShowSplashScreen} = statusSlice.actions;
