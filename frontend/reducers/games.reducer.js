import { SET_GAMES_LIST } from "../actions/games.action";

export const gamesList = (state = [], action) => {
  switch (action.type) {
    case SET_GAMES_LIST:
      return action.payload;
    case "ADD_GAME":
      return [...state, action.game];
    case "DELETE_GAME":
      return state.filter((game) => game.id !== action.id);
    default:
      return state;
  }
};
