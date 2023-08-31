/*eslint-disable*/
import { createSlice } from '@reduxjs/toolkit';
import { addReservation, deleteReservation, getReservations } from './apiSlice';

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    message: null,
    error: null,
    loading: false,
  },

  reducers: {
    clearResMessages: (state) => {
      state.message = null;
      state.error = null;
    },
    removeFromReservations: (state, action) => {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // get all reservations
    builder.addCase(getReservations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
    });

    builder.addCase(getReservations.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addReservation.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    });

    builder.addCase(addReservation.fulfilled, (state) => {
      state.loading = false;
      state.message = 'Reservation added successfully';
      state.error = null;
    });

    builder.addCase(addReservation.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });

    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    });

    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    });

    builder.addCase(deleteReservation.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message;
    });
  },
});

export const { clearMessages, clearResMessages, removeFromReservations } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
