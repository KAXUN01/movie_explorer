import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the context structure
interface MovieContextProps {
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
  favorites: any[];
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
  lastSearch: string;
  setLastSearch: React.Dispatch<React.SetStateAction<string>>;
  genre: number | "";
  setGenre: React.Dispatch<React.SetStateAction<number | "">>;
  year: number | "";
  setYear: React.Dispatch<React.SetStateAction<number | "">>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
export const MovieContext = createContext<MovieContextProps>(
  {} as MovieContextProps
);

// Provider component
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [lastSearch, setLastSearch] = useState<string>(
    () => localStorage.getItem("lastSearch") || ""
  );

  // New filter states
  const [genre, setGenre] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("lastSearch", lastSearch);
  }, [lastSearch]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        favorites,
        setFavorites,
        lastSearch,
        setLastSearch,
        genre,
        setGenre,
        year,
        setYear,
        rating,
        setRating,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
