// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { styles } from "./styles/styles";
import { AppRoutes } from "./routes";
import Navbar from "./components/nav/Navbar";
import "@fontsource-variable/inter";

const GlobalStyles = createGlobalStyle`${styles}`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
