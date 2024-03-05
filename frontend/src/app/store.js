import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/games/games.slice";
import authReducer from "../features/login/auth.slice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    auth: authReducer,
  },
});
