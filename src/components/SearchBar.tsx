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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../api/tmdb";

// Static genre list based on TMDb genre IDs
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
];

const MAX_RECENT = 5;
const RECENT_KEY = "recentMovieSearches";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [genre, setGenre] = useState<number>(0);
  const [year, setYear] = useState<number | "">("");
  const [rating, setRating] = useState<number>(0);

  const { setMovies, setLastSearch } = useContext(MovieContext);

  const handleSearch = async (searchQuery?: string) => {
    const activeQuery = searchQuery ?? query;
    if (!activeQuery.trim()) return;
  
    try {
      const updatedRecent = [activeQuery, ...recentSearches.filter((q) => q !== activeQuery)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updatedRecent));
      setRecentSearches(updatedRecent);
  
      const parsedGenre = genre === 0 ? undefined : genre;
      const parsedYear = year === "" ? undefined : Number(year);
      const parsedRating = rating === 0 ? undefined : rating;
  
      const res = await searchMovies(activeQuery, parsedGenre, parsedYear, parsedRating);
      setMovies(res.data.results);
      setLastSearch(activeQuery);
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

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select
  value={genre}
  onChange={(e) => setGenre(Number(e.target.value))}
  label="Genre"
>
  <MenuItem value={0}>All</MenuItem>
  {GENRES.map((genre) => (
    <MenuItem key={genre.id} value={genre.id}>
      {genre.name}
    </MenuItem>
  ))}
</Select>
      </FormControl>

      <TextField
        label="Year"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={year}
        onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
        inputProps={{ min: 1900, max: new Date().getFullYear() }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Slider
  value={rating}
  onChange={(e, newValue) => setRating(newValue as number)}
  min={0}
  max={10}
  step={0.1}
  valueLabelDisplay="auto"
/>
      </Box>

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
