/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";
import { addReservation, getReservations } from "./apiSlice";


const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    message: null,
    loading: false,
  },

  reducers: {
    clearMessages: (state) => {
      state.message = null;
    }
  },
    extraReducers: (builder) => {
      // get all reservations
      builder.addCase(getReservations.pending, (state) => {
        state.loading = true;
      })

      builder.addCase(getReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })

      builder.addCase(getReservations.rejected, (state) => {
        state.loading = false;
      })

      builder.addCase(addReservation.pending, (state) => {
        state.loading = true;
        state.message = null;
      })

      builder.addCase(addReservation.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Reservation added successfully'
      })

      builder.addCase(addReservation.rejected, (state) => {
        state.loading = false;
        state.message = null;
      })
    }
})

export const { clearMessages } = reservationsSlice.actions;
export default reservationsSlice.reducer