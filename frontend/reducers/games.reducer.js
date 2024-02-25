import { SET_GAMES_LIST } from "../actions/games.action";

export const gamesList = (state = [], action) => {
  switch (action.type) {
    case SET_GAMES_LIST:
      return action.payload;
    default:
      return state;
  }
};
