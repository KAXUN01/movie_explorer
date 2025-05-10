import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./pages/Favorites";
import { ColorModeProvider } from "./ThemeContext";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext"; 
const isLoggedIn = !!localStorage.getItem("authToken");
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <ColorModeProvider>
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/movie/:id"
              element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />}
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </MovieProvider>
      </AuthProvider>
    </ColorModeProvider>
  );
};

export default App;
