import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<Props> = ({ darkMode, toggleTheme }) => {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
