import axios from "axios";
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
} from "./moviesTypes";

const API_KEY = "c033f5b4649da5cc07266010655f43f7";
const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie`;

// Fetching movies with filters and pagination
export const fetchMovies = (page = 1, filters = {}) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });

    try {
      const state = getState();
      const totalPages = state.movies.totalPages;

      // Check if the requested page exceeds the available pages
      if (page > totalPages && totalPages !== 0) {
        dispatch({
          type: FETCH_MOVIES_FAILURE,
          payload: "Page number exceeds the total available pages.",
        });
        return;
      }

      let apiUrl = DISCOVER_URL;
      if (filters.search) {
        apiUrl = SEARCH_URL;
      }

      const params = {
        api_key: API_KEY,
        page,
        query: filters.search || "",
        primary_release_year: filters.year || "",
        with_original_language: filters.language || "",
        with_genres: filters.genre || "",
        "vote_average.gte": filters.rating || "",
        "release_date.gte": filters.releaseDate || "",
        "with_runtime.gte": filters.runtime || "",
      };

      // Remove empty params
      Object.keys(params).forEach((key) => {
        if (!params[key]) {
          delete params[key];
        }
      });

      const response = await axios.get(apiUrl, { params });
      //throw new Error("fetchMovies request failed");

      dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: {
          results: response.data.results,
          filters,
          totalPages:
            response.data.total_pages > 500 ? 500 : response.data.total_pages,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_MOVIES_FAILURE,
        payload: error.message || "Failed to fetch movies",
      });
    }
  };
};

// Fetch movie details
export const fetchMovieDetails = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      //throw new Error("fetchMovieDetails request failed");

      dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MOVIE_DETAILS_FAILURE,
        payload: error.message || "Failed to fetch movie details",
      });
    }
  };
};
