import React from "react";
import { useParams } from "react-router-dom";

import { useGetActorQuery } from "../../services/TMDB";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

// use useParams to get the actor's id
//make a new call using redux toolkit query -> get actor details call...
//research tmdb api docs
// use newly created useGetActorHook to get actor's info to the component

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
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

  console.log(data);

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
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
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
        <Typography variant="h1" align="center" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h4" align="center" gutterBottom >
          Born: {data?.birthday}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {data?.biography}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Actors;
