import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers/index';

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
