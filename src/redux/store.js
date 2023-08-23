import { configureStore } from '@reduxjs/toolkit';
import testReducer from './test/testSlice';
import authReducer from './auth/authSlice';
import carsReducer from './cars/carsSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    cars: carsReducer,
    reservation: reservationsReducer,
  },
});

export default store;
