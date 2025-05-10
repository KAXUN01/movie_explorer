import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActionArea,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MovieCard: React.FC<any> = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  onFavoriteChange,
}) => {
  const navigate = useNavigate();

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const isFavorite = favorites.some((movie: any) => movie.id === id);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((movie: any) => movie.id !== id);
    } else {
      updatedFavorites = [...favorites, { id, title, poster_path, release_date, vote_average }];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    if (onFavoriteChange) onFavoriteChange();
  };

  return (
    <Card
      sx={{
        width: 230,
        height: 420,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <CardActionArea onClick={() => navigate(`/movie/${id}`)} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : "/no-poster.jpg"
          }
          alt={title}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(release_date).getFullYear()} | ⭐ {vote_average.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box display="flex" justifyContent="flex-end" p={1}>
        <IconButton onClick={toggleFavorite} color="error">
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;
