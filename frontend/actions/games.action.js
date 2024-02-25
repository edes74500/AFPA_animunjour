import axios from "axios";

export const SET_GAMES_LIST = "SET_GAMES_LIST";

export const fetchGamesList = () => {
  return (dispatch) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games/all-games`)
      .then((res) => {
        let gamesList = res.data;
        dispatch({ type: SET_GAMES_LIST, payload: gamesList });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_GAMES_LIST, payload: [] });
      });
  };
};
