import React from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../constexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();

  if (favourites) {
    return (
      <div className="favorites">
        <h1>Your Favourites</h1>
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>No favourites yet</h2>
      <p>Add your favourite movies to your list</p>
    </div>
  );
}

export default Favourites;
