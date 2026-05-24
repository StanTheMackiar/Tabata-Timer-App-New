import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, StartPage } from "../pages";
  
  export const Navigation = () => (
    
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/start"
              element={<StartPage/>}
            />

            <Route
              path="/*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
);
  
