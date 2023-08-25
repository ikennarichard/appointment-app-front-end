/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users/tokens';

export const getUsername = createAsyncThunk('auth/username', async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}/name`);
  const data = await res.data;
  return data.name;
});

// handle sign up
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign_up`, userData);
    const data = await response.data;
    if (response.status === 201) {
      return data;
    }
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.error_description[0]);
    }
    console.error(e);
    throw new Error('An error occured while signing up');
  }
});

// handle sign in
export const signin = createAsyncThunk('auth/signin', async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign_in`, userData);
    const data = await response.data;
    if (response.status === 200) {
      return data;
    }
  } catch (e) {
    if (e.response) {
      console.error(e);
      throw new Error('Sign in failed, email or password invalid');
    }
    console.error(e);
    throw new Error('An error occured while signing in');
  }
});
