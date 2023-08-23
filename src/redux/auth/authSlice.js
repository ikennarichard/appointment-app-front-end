/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users/tokens';

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
      throw new Error('Sign in failed, check inputs and try again');
    }
    console.error(e);
    throw new Error('An error occured while signing up');
  }
});

export const getUsername = createAsyncThunk('auth/username', async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}/name`);
  const data = await response.json();
  return data.name;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    resource_owner: JSON.parse(localStorage.getItem('resource_owner')) || '',
    loading: false,
    error: null,
  },
  reducers: {
    resetTokens: (state) => {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('resource_owner');
      localStorage.removeItem('resource_name');
      localStorage.removeItem('access_token');
      state.username = null;
      state.resource_owner = null;
      state.loading = false;
    },
    clearMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { resource_owner, refresh_token } = action.payload;
        localStorage.setItem('resource_owner', JSON.stringify(resource_owner));
        localStorage.setItem('refresh_token', refresh_token);
        state.resource_owner = resource_owner;
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signin.fulfilled, (state, action) => {
        const { token, refresh_token, resource_owner } = action.payload;
        localStorage.setItem('resource_owner', JSON.stringify(resource_owner));
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', token);
        state.resource_owner = resource_owner;
        state.loading = false;
      })
      .addCase(getUsername.fulfilled, (state, action) => {
        const name = action.payload;
        localStorage.setItem('resource_name', name);
        state.username = name;
      });
  },
});

export const { resetTokens, clearMessage } = authSlice.actions;

export default authSlice.reducer;
