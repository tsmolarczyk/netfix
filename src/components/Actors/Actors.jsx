import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery
} from "../../services/TMDB";

import { MovieList, Pagination } from "..";

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const imgStyle = isSmallScreen
    ? {
        margin: "0 auto",
        width: "100%",
        marginBottom: "30px",
        height: "auto"
      }
    : { width: "80%" };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          go back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
            style={{
              maxWidth: "90%",
              borderRadius: "20px",
              objectFit: "cover",
              boxShadow: "0.5em .5em 1em rgb(64,64,70)",
              ...imgStyle
            }}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="h5" align="justify" paragraph>
            {data?.biography || "Sorry, no biography available"}
          </Typography>
          <Box mt="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box m="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
