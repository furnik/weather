import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import { MainListPage } from "./pages/List/MainList";
import { SavedListPage } from "./pages/List/SavedList";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.main} element={<MainListPage />} />
      <Route path={routes.saved} element={<SavedListPage />} />
    </Routes>
  );
};
