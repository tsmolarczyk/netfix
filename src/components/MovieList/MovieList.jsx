import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { Movie } from "..";

const MovieList = ({ movies }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center"
        }
      }}
    >
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
