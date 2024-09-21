import React from "react";
import {
  Collapse,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const Filters = ({
  openFilters,
  tempFilters,
  handleFilterChange,
  handleApplyFilters,
  handleClearFilters,
}) => {
  return (
    <Collapse in={openFilters} timeout={1000} unmountOnExit>
      <Box
        sx={{
          bgcolor: "#404040",
          p: 2,
          borderRadius: 5,
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.5)",
          margin: "20px 0px",
        }}
      >
        {/* Filters in Two Columns */}
        <Grid container spacing={2} justifyContent="center">
          {/* Left Column (4 filters) */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Filter by Year"
              variant="filled"
              type="number"
              value={tempFilters.year}
              onChange={handleFilterChange("year")}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleApplyFilters();
              }}
              fullWidth
              size="small"
              sx={{
                mb: 2,
                bgcolor: "#2c2c2c",
                input: { color: "white" },
                label: { color: "#888" },
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: "#888" } }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "#888" }}>Genre</InputLabel>
              <Select
                value={tempFilters.genre}
                label="Genre"
                onChange={handleFilterChange("genre")}
                variant="filled"
                size="small"
                sx={{
                  color: "white",
                  bgcolor: "#2c2c2c",
                  "& .MuiSelect-select": { backgroundColor: "#2c2c2c" },
                }}
              >
                <MenuItem value="">none</MenuItem>
                <MenuItem value="28">Action</MenuItem>
                <MenuItem value="35">Comedy</MenuItem>
                <MenuItem value="18">Drama</MenuItem>
                <MenuItem value="27">Horror</MenuItem>
                <MenuItem value="10749">Romance</MenuItem>
                <MenuItem value="878">Sci-Fi</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Minimum Rating"
              variant="filled"
              size="small"
              type="number"
              value={tempFilters.rating}
              onChange={handleFilterChange("rating")}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleApplyFilters();
              }}
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#2c2c2c",
                input: { color: "white" },
                label: { color: "#888" },
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: "#888" } }}
            />
          </Grid>

          {/* Right Column (4 filters) */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "#888" }}>Language</InputLabel>
              <Select
                value={tempFilters.language}
                variant="filled"
                size="small"
                label="Language"
                onChange={handleFilterChange("language")}
                sx={{
                  color: "white",
                  bgcolor: "#2c2c2c",
                }}
              >
                <MenuItem value="">none</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="ja">Japanese</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Minimum Release Date"
              variant="filled"
              size="small"
              type="date"
              value={tempFilters.releaseDate}
              onChange={handleFilterChange("releaseDate")}
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#2c2c2c",
                input: { color: "white" },
                label: { color: "#888" },
                borderRadius: 1,
              }}
              InputLabelProps={{
                style: { color: "#888" },
                shrink: true,
              }}
            />

            <TextField
              label="Minimum Runtime (in minutes)"
              variant="filled"
              size="small"
              type="number"
              value={tempFilters.runtime}
              onChange={handleFilterChange("runtime")}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleApplyFilters();
              }}
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#2c2c2c",
                input: { color: "white" },
                label: { color: "#888" },
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: "#888" } }}
            />
          </Grid>

          {/* Apply Filters Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                sx={{
                  mt: 2,
                  minWidth: "150px",
                  height: "50px",
                  borderRadius: 3,
                  background:
                    "linear-gradient(30deg, #ff6b6b 30%, #ff7e5f 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #ff5f5f 30%, #ff6e4f 90%)",
                  },
                }}
                variant="contained"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              <Button
                sx={{
                  mt: 2,
                  minWidth: "150px",
                  height: "50px",
                  borderRadius: 3,
                  background:
                    "linear-gradient(30deg, #ff6b6b 30%, #ff7e5f 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #ff5f5f 30%, #ff6e4f 90%)",
                  },
                }}
                variant="contained"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
};

export default Filters;
