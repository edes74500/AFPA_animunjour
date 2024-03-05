import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "../pages/AdminPanel";
import Jeux from "../pages/Jeux";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/jeux" element={<Jeux />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export { AppRoutes };
