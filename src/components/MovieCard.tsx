import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard: React.FC<any> = ({ id, title, poster_path, release_date }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${id}`)}
      sx={{
        width: 230,
        height: 400,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
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
            {release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
