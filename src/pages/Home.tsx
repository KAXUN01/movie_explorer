import React from "react";
import { Container, Typography, Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import TrendingMovies from "../components/TrendingMovies";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Movie Explorer
        </Typography>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Trending Movies
          </Typography>
          <TrendingMovies />
        </Box>

        <SearchBar />

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <MovieGrid />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
