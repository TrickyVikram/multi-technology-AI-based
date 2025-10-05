import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './features/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
