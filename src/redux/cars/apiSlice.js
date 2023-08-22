/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCars = createAsyncThunk('cars/getCars', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/cars');
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error('An error occured while fetching cars');
  }
});

export const addCar = createAsyncThunk('cars/addCar', async ({ userId, details }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/users/${userId}/cars`, details);
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    console.error('Error adding car:', e);
    throw new Error('An error occured while adding car');
  }
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async ({ userId, carId }) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:3000/users/${userId}/cars/${carId}`);
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
});
