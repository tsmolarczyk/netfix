import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { useTheme, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const theme = useTheme();

  console.log("movie", movie);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "10px" }}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{
            alignItems: "center",
            fontWeight: "bold",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer"
            },
            [theme.breakpoints.up("xs")]: {
              display: "flex",
              flexDirection: "column"
            }
          }}
        >
          <Box
            component="img"
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            sx={{
              borderRadius: "20px",
              height: "300px",
              mb: "10px",
              "&:hover": {
                transform: "scale(1.05)"
              }
            }}
          />
          <Typography
            sx={{
              color: theme.palette.text.primary,
              textOverflow: "ellipsis",
              width: "230px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              mt: "10px",
              mb: 0,
              textAlign: "center"
            }}
            variant="h5"
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Box>
      </Grow>
    </Grid>
  );
};

export default Movie;
