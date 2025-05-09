import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { getTrendingMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const TrendingMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results.slice(0, 10)); // 10 movies
      } catch (error) {
        console.error("Failed to fetch trending movies", error);
      }
    };

    fetchTrending();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <Box key={movie.id} p={1}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TrendingMovies;
