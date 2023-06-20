import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
