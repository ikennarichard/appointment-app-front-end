import { createSlice } from '@reduxjs/toolkit';
import { getCars, deleteCar, addCar } from './apiSlice';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    error: null,
    loading: false,
    status: false,
  },
  reducers: {
    deleteCarsArr: (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
      state.loading = true;
      state.status = false;
    });
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.cars = action.payload;
    });
    builder.addCase(getCars.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

    builder.addCase(addCar.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.message = 'Adding new car...';
    });
    builder.addCase(addCar.fulfilled, (state) => {
      state.loading = false;
      state.status = true;
      state.message = 'Car was added succeefully';
    });
    builder.addCase(addCar.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
      state.status = false;
    });

    builder.addCase(deleteCar.fulfilled, (state) => {
      state.loading = false;
      state.status = true;
    });

    builder.addCase(deleteCar.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });
  },
});

export const { deleteCarsArr } = carsSlice.actions;

export default carsSlice.reducer;
