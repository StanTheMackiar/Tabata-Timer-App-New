import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, RunPage, SummaryPage } from "../pages";
import { AppRoute } from "./routes.enum";

export const Navigation = () => (
  <Routes>
    <Route
      path={AppRoute.HOME}
      element={<HomePage />}
    />
    <Route
      path={AppRoute.RUN}
      element={<RunPage />}
    />
    <Route
      path={AppRoute.SUMMARY}
      element={<SummaryPage />}
    />
    <Route
      path="/*"
      element={
        <Navigate
          to={AppRoute.HOME}
          replace
        />
      }
    />
  </Routes>
);
