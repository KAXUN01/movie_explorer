import React, { createContext, useState, useEffect, ReactNode } from "react";

interface MovieContextProps {
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
  favorites: any[];
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
  lastSearch: string;
  setLastSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const MovieContext = createContext<MovieContextProps>(
  {} as MovieContextProps
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [lastSearch, setLastSearch] = useState<string>(
    () => localStorage.getItem("lastSearch") || ""
  );

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
