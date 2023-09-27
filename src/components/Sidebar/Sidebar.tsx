import React, { useEffect } from "react";
import "./styles.css";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  return (
    <>
      <Link to="/" className="classes.imageLink"
      <img sx={{width: "70%"}} src={theme.palette.mode === 'light' ? redLogo : blueLogo} alt="Netfix logo"/></Link>
    </>
  );
};

export default Sidebar;
