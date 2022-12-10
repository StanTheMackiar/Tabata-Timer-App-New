import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Start } from "../pages";
  
  export const Navigation = () => {
    return (
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/start"
              element={<Start/>}
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
  };
  