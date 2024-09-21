import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Massege";
import {
  fetchMovies,
  fetchMovieDetails,
} from "../features/movies/moviesActions";
import {
  Container,
  Grid,
  Pagination,
  Box,
} from "@mui/material";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { Loader } from "./Loader/Loader";
import StickySearchBox from "./StickySearchBox";
import Filters from "./Filters";

function MoviesGallery() {
  const dispatch = useDispatch();
  const {
    list: movies,
    loading,
    error,

    totalPages,
  } = useSelector((state) => state.movies) || {};

  const { movieDetails, loadingDetails, errorDetails } =
    useSelector((state) => state.movieDetails) || {};

  const [filters, setFilters] = useState({
    search: "",
    year: "",
    genre: "",
    language: "",
    rating: "",
    releaseDate: "",
    runtime: "",
  });

  const [tempFilters, setTempFilters] = useState({
    year: "",
    genre: "",
    language: "",
    rating: "",
    releaseDate: "",
    runtime: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies when filters or page changes
  useEffect(() => {
    dispatch(fetchMovies(currentPage, filters));
  }, [dispatch, currentPage, filters]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle search button click
  const handleSearchSubmit = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchInput,
    }));
    setCurrentPage(1);
  };

  // Handle temporary filter changes
  const handleFilterChange = useCallback(
    (filterName) => (event) => {
      const value = event.target.value;
      setTempFilters((prevTempFilters) => ({
        ...prevTempFilters,
        [filterName]: value,
      }));
    },
    []
  );

  // Handle apply filters button click
  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      ...tempFilters,
    });

    setCurrentPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      search: "",
      year: "",
      genre: "",
      language: "",
      rating: "",
      releaseDate: "",
      runtime: "",
    });
    setTempFilters({
      year: "",
      genre: "",
      language: "",
      rating: "",
      releaseDate: "",
      runtime: "",
    });
    setCurrentPage(1);
  };

  // Open Modal and fetch movie details by ID
  const handleOpenModal = (movieId) => {
    dispatch(fetchMovieDetails(movieId));
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle pagination change
  const handleNextPage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, color: "#fff", minHeight: "100vh" }}>
      {/* Background and Header */}
      <img
        src={require("../images/background.jpg")}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: 0.5,
        }}
      />
      {/* Logo */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <img
          src={require("../images/Cinema.png")}
          alt="Logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </Container>

      <Container>
        {error ? (
          <Message message={error}></Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Container>
            {/* Search Box with Button */}

            <StickySearchBox
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
            />
            {/* Filter Area */}
            <Filters
              openFilters={openFilters}
              tempFilters={tempFilters}
              handleFilterChange={handleFilterChange}
              handleApplyFilters={handleApplyFilters}
              handleClearFilters={handleClearFilters}
            />
            {/* Movie Cards Grid */}
            <Grid container spacing={4}>
              {movies?.map((movie) => (
                <Grid item xs={6} sm={4} md={3} key={movie.id}>
                  <MovieCard
                    movie={movie}
                    openModal={() => handleOpenModal(movie.id)}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleNextPage}
                color="primary"
                size="medium"
                sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
              />
            </Box>
          </Container>
        )}
      </Container>

      {/* Movie Modal */}
      {isModalOpen && movieDetails && (
        <MovieModal
          open={isModalOpen}
          movie={movieDetails}
          loading={loadingDetails}
          error={errorDetails}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
}

export default MoviesGallery;
