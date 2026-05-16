import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Автоматически включает DevTools
});

export default store;