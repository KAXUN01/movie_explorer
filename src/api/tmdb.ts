import axios from "axios";

// Ensure REACT_APP_TMDB_API_KEY is defined in your .env file
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fail-safe if API_KEY is missing
if (!API_KEY) {
  throw new Error("REACT_APP_TMDB_API_KEY is not defined in .env");
}

export const searchMovies = async (
  query?: string,
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

  let endpoint = "discover/movie";

  if (query) {
    endpoint = "search/movie";
    params.query = query;
  }

  if (genre) {
    params.with_genres = genre;
  }

  if (year) {
    params.primary_release_year = year;
  }

  if (rating) {
    params["vote_average.gte"] = rating;
  }

  return axios.get(`${BASE_URL}/${endpoint}`, {
    params,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
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

