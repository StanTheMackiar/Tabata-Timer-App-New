import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, StartPage } from "../pages";
import { AppRoute } from "./routes.enum";
  
  export const Navigation = () => (
    
          <Routes>
            <Route
              path={AppRoute.HOME}
              element={<HomePage />}
            />
            <Route
              path={AppRoute.START}
              element={<StartPage/>}
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
  
