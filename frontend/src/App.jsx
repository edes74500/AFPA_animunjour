// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/nav/Navbar";
import Jeux from "./pages/Jeux";
import { createGlobalStyle } from "styled-components";
import { styles } from "./styles/styles";

const GlobalStyles = createGlobalStyle`
${styles}  `;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/jeux" element={<Jeux />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
