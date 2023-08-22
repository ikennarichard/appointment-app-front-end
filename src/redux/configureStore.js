import { configureStore } from '@reduxjs/toolkit';
import testReducer from './test/testSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
  },
});

export default store;
