import axios from "axios";

// Ensure REACT_APP_TMDB_API_KEY is defined in your .env file
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fail-safe if API_KEY is missing
if (!API_KEY) {
  throw new Error("REACT_APP_TMDB_API_KEY is not defined in .env");
}

export const searchMovies = async (
  query: string,
  genre?: number,
  year?: number,
  rating?: number
) => {
  const params: any = {
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: false,
    page: 1,
  };

  let endpoint = "search/movie"; // Default endpoint

  // Handle filters and query
  if (query) {
    params.query = query;
  }

  if (genre) {
    params.with_genres = genre; // Genre filter
  }

  if (year) {
    params.primary_release_year = year; // Year filter
  }

  if (rating) {
    params["vote_average.gte"] = rating; // Rating filter
  }

  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data; // Return the movie data
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieDetails = (id: string) =>
  axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      append_to_response: "videos,credits",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

export const getMovieDetailsWithCredits = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      append_to_response: "videos,credits",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  console.log("Trending Movies API response:", response.data);
  return response.data;
};