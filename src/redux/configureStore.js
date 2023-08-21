import { configureStore } from '@reduxjs/toolkit';
import testReducer from './test/testSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export default store;
