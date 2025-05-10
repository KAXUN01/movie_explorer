import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
           Your Favorite Movies
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {favorites.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              color: "text.secondary",
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">No favorite movies found.</Typography>
            <Typography variant="body2">Start adding your favorite picks!</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: {
                xs: "center", // Mobile: centered
                sm: "flex-start", // Tablet & up: left-aligned
              },
            }}
          >
            {favorites.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  width: {
                    xs: "100%", // Mobile: full width
                    sm: "48%",  // Tablet: 2 per row
                    md: "31%",  // Medium: 3 per row
                    lg: "23%",  // Large: 4+ per row
                  },
                }}
              >
                <MovieCard {...movie} onFavoriteChange={handleFavoriteChange} />
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Favorites;
