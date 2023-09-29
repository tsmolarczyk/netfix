import React, { useState, useReact } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB.js";
import MovieList from "../MovieList/MovieList.jsx";

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name. <br /> Please searc for something
          else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          Sorry, something went wrong. <br /> Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
