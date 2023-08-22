import { configureStore } from '@reduxjs/toolkit';
import testReducer from './test/testSlice';
import authReducer from './auth/authSlice';
import carsReducer from './cars/carsSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    cars: carsReducer,
  },
});

export default store;
