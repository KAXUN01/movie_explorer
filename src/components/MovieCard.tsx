import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MovieProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieCard: React.FC<MovieProps> = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/movie/${id}`)}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {release_date} | Rating: {vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;