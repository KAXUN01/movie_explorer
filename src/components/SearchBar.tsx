import React, { useContext, useState, useEffect } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../api/tmdb";

// Constants for filter options
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  // Add more genres as needed
];

const MAX_RECENT = 5;
const RECENT_KEY = "recentMovieSearches";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [genre, setGenre] = useState<number | undefined>(undefined); // Default as undefined
  const [year, setYear] = useState<number | undefined>(undefined);  // Default as undefined
  const [rating, setRating] = useState<number>(0); // Default rating is 0
  const { setMovies, setLastSearch } = useContext(MovieContext);

  // Handle search
  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    try {
      // Save recent searches in localStorage
      const updatedRecent = [
        searchQuery,
        ...recentSearches.filter((q) => q !== searchQuery),
      ].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updatedRecent));
      setRecentSearches(updatedRecent);

      // Get movie data with filters
      const res = await searchMovies(
        searchQuery,
        genre !== undefined ? genre : undefined,  // Ensure genre is undefined if not set
        year !== undefined ? year : undefined,    // Ensure year is undefined if not set
        rating > 0 ? rating : undefined           // Ensure rating is undefined if 0
      );
      setMovies(res.results);
      setLastSearch(searchQuery);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Handle recent search click
  const handleSelectRecent = (query: string) => {
    setQuery(query);
    handleSearch(query);
  };

  const handleClearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  return (
    <Box>
      {/* Search Input */}
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

      {/* Genre Filter */}
      <FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel>Genre</InputLabel>
  <Select
    value={genre ?? ""} // Ensures it defaults to an empty string if undefined
    onChange={(e) => {
      const value = e.target.value;
      // If the value is an empty string, set genre to undefined
      // Else, safely convert the value to a number
      setGenre(value === "" ? undefined : parseInt(value, 10));
    }}
    label="Genre"
  >
    <MenuItem value="">All</MenuItem>
    {GENRES.map((genre) => (
      <MenuItem key={genre.id} value={genre.id}>
        {genre.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      {/* Year Filter */}
      <TextField
        label="Year"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={year ?? ""} // Ensures it defaults to an empty string if undefined
        onChange={(e) => setYear(e.target.value === "" ? undefined : parseInt(e.target.value))}
        InputProps={{
          inputProps: {
            min: 1900,
            max: new Date().getFullYear(),
          },
        }}
      />

      {/* Rating Filter */}
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Rating</Typography>
        <Slider
          value={rating}
          onChange={(e, newValue) => setRating(newValue as number)}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}`}
        />
      </Box>

      {/* Recent Search List */}
      {recentSearches.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Searches:
          </Typography>
          <List dense>
            {recentSearches.map((item, index) => (
              <ListItem
                key={index}
                component="button"
                onClick={() => handleSelectRecent(item)}
                sx={{ textAlign: "left" }}
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