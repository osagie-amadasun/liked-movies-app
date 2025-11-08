import React from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../constexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavourite, addFavourite, removeFavourite } = useMovieContext();
  const favourite = isFavourite(movie.id);

  function onFavouriteClick(e) {
    e.preventDefault();
    if (favourite) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favourite-button ${favourite ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            Add to Favourites
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
