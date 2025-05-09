import React, { useContext } from "react";
import Box from "@mui/material/Box";
import MovieCard from "./MovieCard";
import { MovieContext } from "../context/MovieContext";

const MovieGrid: React.FC = () => {
  const { movies } = useContext(MovieContext);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      padding={2}
    >
      {movies.map((movie) => (
        <Box key={movie.id} flex="1 1 250px" maxWidth="300px">
          <MovieCard {...movie} />
        </Box>
      ))}
    </Box>
  );
};

export default MovieGrid;
