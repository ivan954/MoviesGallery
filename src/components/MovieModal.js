import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Loader } from "./Loader/Loader";
import Massege from "./Massege";

const MovieModal = ({ open, movie, loading, onClose, error }) => {
  const {
    title,
    overview,
    release_date,
    vote_average,
    poster_path,
    genres = [],
    runtime,
    tagline,
  } = movie;

  const defaultPoster = "path/to/default/image.jpg";

  return (
    <Modal open={open} onClose={onClose}>
      {error ? (
        <Massege message={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#2c2c2c",
            borderRadius: "10px",
            p: 4,
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
            maxHeight: "90vh",
            overflowY: "auto",
            color: "#fff",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : defaultPoster
              }
              alt={title}
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "10px",
                height: "auto",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {title}
          </Typography>

          {tagline && (
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {tagline}
            </Typography>
          )}

          <Typography variant="body1" gutterBottom>
            <strong>Release Date:</strong> {release_date || "N/A"}
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>Overview:</strong> {overview || "No overview available."}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>Rating:</strong> {vote_average || "N/A"} / 10
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>Genres:</strong>{" "}
            {genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>Runtime:</strong> {runtime ? `${runtime} minutes` : "N/A"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{
              mt: 2,
              display: "block",
              ml: "auto",
              mr: "auto",
              width: "fit-content",
              background: "linear-gradient(30deg, #ff6b6b 30%, #ff7e5f 90%)",
            }}
          >
            Close
          </Button>
        </Box>
      )}
    </Modal>
  );
};

export default MovieModal;
