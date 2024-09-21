import { configureStore } from "@reduxjs/toolkit";
import { getMovies, getMovieDetails } from "./features/movies/moviesReducer";

export const store = configureStore({
  reducer: {
    movies: getMovies,
    movieDetails: getMovieDetails,
  },
});
