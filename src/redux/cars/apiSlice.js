/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCars = createAsyncThunk('cars/getCars', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/cars', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error(e.response.data.error);
    throw new Error('An error occured while fetching cars');
  }
});

export const addCar = createAsyncThunk(
  'cars/addCar',
  async ({ userId, details }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/users/${userId}/cars`,
        details,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (e) {
      console.error('Error adding car:', e);
      throw new Error('An error occured while adding car');
    }
  },
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async ({ userId, carId }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/users/${userId}/cars/${carId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        return 'Car deleted successfully';
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occured while deleting car!');
    }
  },
);
