// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/nav/Navbar";
import Jeux from "./pages/Jeux";
import { createGlobalStyle } from "styled-components";
import { styles } from "./styles/styles";

const GlobalStyles = createGlobalStyle`
${styles}`;

import rootReducer from "../reducers";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchGamesList } from "../actions/games.action";

const AppWrapper = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGamesList());
  }, [dispatch]);
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/jeux" element={<Jeux />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}

export default AppWrapper;
