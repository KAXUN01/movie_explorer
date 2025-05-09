import axios from "axios";

// Ensure REACT_APP_TMDB_API_KEY is defined in your .env file
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fail-safe if API_KEY is missing
if (!API_KEY) {
  throw new Error("REACT_APP_TMDB_API_KEY is not defined in .env");
}

export const searchMovies = (query: string, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

export const getMovieDetails = (id: string) =>
  axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos,credits",
    },
  });

export const getMovieDetailsWithCredits = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  return res.json();
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: {
      api_key: API_KEY,
    },
  });
  console.log("Trending Movies API response:", response.data); // ✅ Debug
  return response.data;
};
