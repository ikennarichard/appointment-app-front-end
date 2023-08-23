import { createSlice } from '@reduxjs/toolkit';
import { getCars, deleteCar, addCar } from './apiSlice';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    error: null,
    loading: false,
    message: null,
  },
  reducers: {
    removeFromCars: (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },

    clearCarMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
    });
    builder.addCase(getCars.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.error = action.error.message;
    });

    builder.addCase(addCar.pending, (state) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(addCar.fulfilled, (state) => {
      state.loading = false;
      state.message = 'Car was added successfully';
    });
    builder.addCase(addCar.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });

    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    });

    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });

    builder.addCase(deleteCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { removeFromCars, getUserCars, clearCarMessages } = carsSlice.actions;

export default carsSlice.reducer;
