/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit';
import { signin, signup, getUsername } from './apiSlice';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    resource_owner: JSON.parse(localStorage.getItem("resource_owner")),
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetTokens: (state) => {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("resource_owner");
      localStorage.removeItem("resource_name");
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in"); //added this so that it removes the expires_in from local storage on logout.
      state.username = null;
      state.error = null;
      state.message = null;
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
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { resource_owner, refresh_token, token } = action.payload;
        localStorage.setItem("resource_owner", JSON.stringify(resource_owner));
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("access_token", token);
        localStorage.setItem("expires_in", Date.now() + 3600000); //added this, converts miliseconds to hours, one hour in this case.
        state.resource_owner = resource_owner;
        state.loading = false;
        state.error = null;
        state.message = "Sign up successfull, please log into your account";
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
        localStorage.setItem("resource_owner", JSON.stringify(resource_owner));
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("access_token", token);
        localStorage.setItem("expires_in", Date.now() + 3600000); //added this converts miliseconds to hours, one hour in this case.
        state.resource_owner = resource_owner;
        state.loading = false;
      })
      .addCase(getUsername.fulfilled, (state, action) => {
        const name = action.payload;
        localStorage.setItem("resource_name", name);
        state.username = name;
      });
  },
});

export const { resetTokens, clearMessage } = authSlice.actions;

export default authSlice.reducer;
