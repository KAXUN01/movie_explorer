import React from "react";
import { IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../ThemeContext";
import LogoutButton from "../pages/LogoutButton";

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {localStorage.getItem("authToken") && (
        <Box sx={{ ml: 2 }}>
          <LogoutButton />
        </Box>
      )}
    </Box>
  );
};

export default ThemeToggle;
