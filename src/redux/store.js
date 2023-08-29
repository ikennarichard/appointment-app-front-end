import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import carsReducer from './cars/carsSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
    reservation: reservationsReducer,
  },
});

export default store;
