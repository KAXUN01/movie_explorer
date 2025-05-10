import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteChange = () => {
    const updated = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(updated);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite movies found.</Typography>
      ) : (
        <Grid container spacing={2}>
  {favorites.map((movie) => (
    <Box key={movie.id} sx={{ width: { xs: "100%", sm: "48%", md: "23%" }, m: 1 }}>
      <MovieCard {...movie} onFavoriteChange={handleFavoriteChange} />
    </Box>
  ))}
</Grid>
      )}
    </Box>
  );
};

export default Favorites;
