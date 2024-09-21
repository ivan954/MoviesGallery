import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const StickySearchBox = ({
  searchInput,
  handleSearchChange,
  handleSearchSubmit,
  openFilters,
  setOpenFilters,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    if (offset > 300) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        margin: "15px 0px",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: isSticky ? "rgba(0, 0, 0, 0.5)" : "",
        padding: "10px",
        transition: "background-color 0.3s ease",
      }}
    >
      <Grid container spacing={2}>
        {/* Search Field */}
        <Grid item xs={12} sm={10} md={10}>
          <TextField
            label="Search Movie"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearchSubmit();
            }}
            fullWidth
            sx={{
              bgcolor: "#2c2c2c",
              input: { color: "white" },
              label: { color: "#888" },
              borderRadius: 3,
            }}
            InputLabelProps={{ style: { color: "#888" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleSearchSubmit}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <SearchIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Toggle Filters Button */}
        <Grid item xs={12} sm={2} md={2}>
          <Button
            sx={{
              minWidth: "100%",
              height: "55px",
              borderRadius: 3,
              background: openFilters
                ? "linear-gradient(45deg, #ff5f5f 30%, #ff6e4f 90%)"
                : "#2c2c2c",
              color: "white",
            }}
            variant="contained"
            onClick={() => {
              if (!openFilters) {
                scrollToTop();
              }
              setOpenFilters(!openFilters);
            }}
            fullWidth
          >
            <FilterAltIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StickySearchBox;
