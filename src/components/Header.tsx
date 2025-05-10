import React from "react";
import { IconButton, Box, Button } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../ThemeContext";
import LogoutButton from "../pages/LogoutButton";
import { useNavigate } from "react-router-dom";

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Theme toggle */}
      <IconButton onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {/* Show buttons only if logged in */}
      {localStorage.getItem("authToken") && (
        <>
          {/* Favorites Button */}
          <Button
            variant="outlined"
            color="inherit"
            sx={{ ml: 2 }}
            onClick={() => navigate("/favorites")}
          >
            Favorites
          </Button>

          {/* Logout Button */}
          <Box sx={{ ml: 2 }}>
            <LogoutButton />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ThemeToggle;
