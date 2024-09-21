import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function MovieCard({ movie, openModal }) {
  return (
    <Card
      sx={{ cursor: "pointer", bgcolor: "#1c1c1c" }}
      onClick={() => openModal(movie.id)}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6" color="white" noWrap>
          {movie.title}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="gray">
            {movie.release_date}
          </Typography>
          <Typography variant="body2" color="yellow">
            ⭐ {movie.vote_average}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
