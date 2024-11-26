import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducer';

// Create the Redux store
const Store = configureStore({
  reducer: reducer,
});

export default Store;
