import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress
} from "@mui/material";
import genreIcons from "../../assets/genres";
import logoNetflix from "../../assets/netflix-logo.png";
import logoNetflixBlack from "../../assets/netflix-logo-black.png";

import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useGetGenresQuery } from "../../services/TMDB";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" }
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  console.log(data);

  return (
    <>
      <Link
        to="/"
        style={{ display: "flex", justifyContent: "center", padding: "10% 0" }}
      >
        <img
          style={{ width: "70%" }}
          src={theme.palette.mode === "light" ? logoNetflix : logoNetflix}
          alt="Netflix logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none"
            }}
            to="/"
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  style={{
                    filter: theme.palette.mode === "dark" ? "invert(1)" : "none"
                  }}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none"
              }}
              to="/"
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    style={{
                      filter:
                        theme.palette.mode === "dark" ? "invert(1)" : "none"
                    }}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
