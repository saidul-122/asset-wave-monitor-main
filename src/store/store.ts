
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cryptoReducer from './cryptoSlice';
import portfolioReducer from './portfolioSlice';
import newsReducer from './newsSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    portfolio: portfolioReducer,
    news: newsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
