import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk("user/login", async ({ email, password }) => {
  try {
    const reponse = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    return reponse.data;
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response.data.error);
  }
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    const reponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true });
    console.log(reponse);
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log("failed connection");
        console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = {};
        state.error = null;
        console.log("loged out");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "idle";
        state.user = {};
        state.error = null;
      });
  },
});

export const currentUserName = (state) => (state.auth.user.user ? state.auth.user.user : null);

export default authSlice.reducer;
