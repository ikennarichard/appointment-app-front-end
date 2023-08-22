/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/users/tokens';

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await fetch(`${API_URL}/sign_up`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
});

export const signin = createAsyncThunk('auth/signin', async (userData) => {
  const response = await fetch(`${API_URL}/sign_in`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
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
    resource_owner: JSON.parse(localStorage.getItem('resource_owner')),
    loading: false,
    status: false,
  },
  reducers: {
    resetTokens: (state) => {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('resource_owner');
      localStorage.removeItem('resource_name');
      localStorage.removeItem('access_token');
      state.username = null;
      state.resource_owner = null;
      state.status = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(signup.rejected, (state) => {
        state.status = false;
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { token, resource_owner, refresh_token } = action.payload;
        localStorage.setItem('resource_owner', JSON.stringify(resource_owner));
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', token);
        state.resource_owner = resource_owner;
        state.status = true;
        state.loading = false;
      })
      .addCase(signin.pending, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(signin.rejected, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        const { token, refresh_token, resource_owner } = action.payload;
        localStorage.setItem('resource_owner', JSON.stringify(resource_owner));
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', token);
        state.resource_owner = resource_owner;
        state.loading = false;
        state.status = true;
      })
      .addCase(getUsername.fulfilled, (state, action) => {
        const name = action.payload;
        localStorage.setItem('resource_name', name);
        state.username = name;
      });
  },
});

export const { resetTokens } = authSlice.actions;

export default authSlice.reducer;
