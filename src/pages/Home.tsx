import React from "react";
import { Container, Typography, Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import TrendingMovies from "../components/TrendingMovies";
import { ThemeToggle } from "../components/ThemeToggle";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 5 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h3" component="h1">
            Movie Explorer
          </Typography>
          <ThemeToggle />
        </Box>

        {/* Trending Movies Section */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Trending Movies
          </Typography>
          <TrendingMovies />
        </Box>

        {/* Search Bar */}
        <Box>
          <SearchBar />
        </Box>

        {/* Search Results */}
        <Box>
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
