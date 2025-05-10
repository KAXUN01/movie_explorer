import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../api/tmdb";

const MAX_RECENT = 5;
const RECENT_KEY = "recentMovieSearches";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { setMovies, setLastSearch } = useContext(MovieContext);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    try {
      // Save to localStorage (max 5 recent)
      const updatedRecent = [searchQuery, ...recentSearches.filter((q) => q !== searchQuery)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updatedRecent));
      setRecentSearches(updatedRecent);

      // Call API
      const res = await searchMovies(searchQuery);
      setMovies(res.data.results);
      setLastSearch(searchQuery);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleClearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  };

  const handleSelectRecent = (query: string) => {
    setQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  return (
    <Box>
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
              <IconButton onClick={() => handleSearch()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {recentSearches.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Searches:
          </Typography>
          <List dense>
            {recentSearches.map((item, index) => (
              <ListItem
                key={index}
                component="button"  // Set component to "button"
                onClick={() => handleSelectRecent(item)}
                sx={{ textAlign: "left" }}  // Optional: For better styling
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Button size="small" onClick={handleClearRecent} color="secondary">
            Clear All
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
