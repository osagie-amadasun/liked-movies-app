import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    console.log(savedFavourites);
    if (savedFavourites) setFavourites(JSON.parse(savedFavourites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie) => {
    setFavourites((prev) => [...prev, movie]);
  };

  const removeFavourite = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
