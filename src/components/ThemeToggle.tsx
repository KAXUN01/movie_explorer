import React from "react";
import { IconButton, Button, Box, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "../ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { isLoggedIn, logout } = useAuth();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {isLoggedIn ? (
        <>
          <Button component={Link} to="/favorites" color="inherit">
            Favorites
          </Button>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </>
      ) : (
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
      )}
    </Box>
  );
};
