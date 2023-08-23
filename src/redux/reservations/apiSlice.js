/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReservations = createAsyncThunk('reservations/getAllReservations', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/users/${id}/reservations`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occured while fetching reservations');
  }
});

export const addReservation = createAsyncThunk('reservations/addReservation', async ({ userId, carId, details }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/users/${userId}/cars/${carId}/reservations`, details);
    if (response.status === 201) {
      console.log('Car was added');
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error ocuured while reserving car');
  }
});
