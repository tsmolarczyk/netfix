import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  return (
    <Box
      sx={{
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }
      }}
    >
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
        variant="standard"
        InputProps={{
          sx: {
            color: theme.palette.mode === "light" ? "black" : "inherit",
            filter: theme.palette.mode === "light" ? "invert(1)" : "inherit",
            [theme.breakpoints.down("sm")]: {
              mt: "-10px",
              mb: "10px"
            }
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default Search;
