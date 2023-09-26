import "../../styles.css";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const NavBar = () => {
  console.log("NavBar");
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const isAuthenticated = true;
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          className="toolbar"
          sx={theme => ({
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            ml: "240px",
            [theme.breakpoints.down("sm")]: {
              marginLeft: 0,
              flexWrap: "wrap"
            }
          })}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => {}}
              sx={theme => ({
                mr: theme.spacing(2),
                [theme.breakpoints.up("sm")]: {
                  display: "none"
                }
              })}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && "Search..."}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/123`}
                sx={{}}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
                />
              </Button>
            )}
          </div>
          { isMobile && "Search..."}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
