/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReservations = createAsyncThunk('reservations/getAllReservations', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/users/${id}/reservations`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occured while fetching reservations');
  }
});

export const addReservation = createAsyncThunk(
  'reservations/addReservation',
  async ({ userId, carId, details }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/users/${userId}/cars/${carId}/reservations`,
        details,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error ocuured while reserving car');
    }
  }
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ userId, reservationId }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/users/${userId}/reservations/${reservationId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      if (response.statusText === 'OK') {
        return 'Reservation deleted successfully';
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occured while deleting reservation');
    }
  }
);
