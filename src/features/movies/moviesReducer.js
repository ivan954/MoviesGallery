import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
} from "./moviesTypes";

const initialMoviesState = {
  list: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const initialMovieDetailsState = {
  movieDetails: null,
  loadingDetails: false,
  errorDetails: null,
};

// Movies list Reducer
export const getMovies = (state = initialMoviesState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.results,
        filters: action.payload.filters,
        totalPages: action.payload.totalPages,
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Movie Details Reducer
export const getMovieDetails = (state = initialMovieDetailsState, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loadingDetails: true,
        errorDetails: null,
      };

    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieDetails: action.payload,
        loadingDetails: false,
      };

    case FETCH_MOVIE_DETAILS_FAILURE:
      return {
        ...state,
        loadingDetails: false,
        errorDetails: action.payload,
      };

    default:
      return state;
  }
};
