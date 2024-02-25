import { combineReducers } from "redux";
import { gamesList } from "./games.reducer";

export default combineReducers({
  games: gamesList,
});
