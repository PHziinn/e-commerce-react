import rootReducer from './redux-reducer/root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
