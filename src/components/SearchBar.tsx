import React, { useContext, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../api/tmdb";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { setMovies, setLastSearch } = useContext(MovieContext);

  const handleSearch = async () => {
    try {
      const res = await searchMovies(query);
      setMovies(res.data.results);
      setLastSearch(query);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
