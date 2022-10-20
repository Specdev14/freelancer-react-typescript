import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import homeReducer from './home/homeSlice';
import resourcesSlice from './resources/resourcesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    resources: resourcesSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;