import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  games: [],
  status: "idle",
  error: null,
};

export const fetchGamesList = createAsyncThunk("games/fetchGamesList", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/games/all-games`, { withCredentials: true });
    console.log(res.data);
    return res.data;
  } catch (err) {
    const error = err;
    throw new Error(error);
  }
});

export const deleteGameById = createAsyncThunk("games/deleteGameById", async (gameId) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/games/delete-game/${gameId}`, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const addGame = createAsyncThunk("games/addGame", async (game) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/games/add-game`, game, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGamesList.fulfilled, (state, action) => {
        state.status = "success";
        state.games = action.payload;
      })
      .addCase(fetchGamesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteGameById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGameById.fulfilled, (state, action) => {
        state.status = "success";
        console.log("game deleted" + action.payload.id);
        state.games = state.games.filter((game) => game._id !== action.payload.id);
      })
      .addCase(deleteGameById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addGame.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.status = "success";
        state.games.push(action.payload);
      })
      .addCase(addGame.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllGames = (state) => state.games.games;

export default gamesSlice.reducer;
