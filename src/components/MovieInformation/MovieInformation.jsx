import React, { useState } from "react";

import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import genreIcons from "../../assets/genres";
import { MovieList } from "..";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const MovieInformation = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movie_id: id
    });

  const isMovieFavorited = true;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};
  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong. Go back. </Link>
      </Box>
    );
  }

  const imgStyle = isSmallScreen
    ? {
        margin: "0 auto",
        width: "100%",
        marginBottom: "30px",
        height: "auto"
      }
    : { width: "80%" };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        margin: "10px 0 !important",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          flexWrap: "wrap"
        }
      }}
    >
      <Grid item sm={12} lg={4} align="center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          style={{
            borderRadius: "20px",
            boxShadow: "0.5em 1em 1em rgb(64,64,70)",
            width: "80%",
            ...imgStyle
          }}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px 0 !important",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              flexWrap: "wrap"
            }
          }}
        >
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom sx={{ ml: "10px" }}>
              {data?.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>

        <Grid
          item
          className="genres"
          sx={{
            margin: "10px 0 !important",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          {data?.genres.map(genre => (
            <Link
              key={genre.name}
              className="links"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                [theme.breakpoints.down("sm")]: {
                  padding: "0.5rem 1rem"
                }
              }}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                style={{
                  filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
                  marginRight: "10px"
                }}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ mt: "10px" }}>
          Overview
        </Typography>
        <Typography sx={{ mb: "2rem" }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <img
                        style={{
                          width: "100%",
                          maxWidth: "7em",
                          height: "8em",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container sx={{ mt: "2rem" }}>
          <Box
            className="btnscontainer"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column"
              }
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              className="btnscontainer"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                widowsth: "100%",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column"
                }
              }}
            >
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener nooreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener nooreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="btnscontainer"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column"
                }
              }}
            >
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorites"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle"
                    sx={{ textDecoration: "none" }}
                  >
                    back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {/* Loop through recommendded movies */}
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        sx={{
          display: " flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            style={{
              width: "50%",
              height: "50%",
              [theme.breakpoints.down("sm")]: {
                width: "90%",
                height: "90%"
              }
            }}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
