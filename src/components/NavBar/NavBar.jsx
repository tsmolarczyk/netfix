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
import { useState } from "react";
import { Sidebar } from "..";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={theme => ({
            height: "80px",
            bgcolor: "#E50914",
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
              onClick={() => setMobileOpen(prevMobileOpen => !prevMobileOpen)}
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
                sx={{
                  "&:hover": {
                    color: "white !important",
                    textDecoration: "none"
                  }
                }}
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
          {isMobile && "Search..."}
        </Toolbar>
      </AppBar>
      <div style={{ marginLeft: isMobile ? "0px" : "240px" }}>
        <nav
          sx={{
            [theme.breakpoints.up("sm")]: {
              width: 240,
              flexShrink: 0
            }
          }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(prevMobileOpen => !prevMobileOpen)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 240
                }
              }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{
                "& .MuiDrawer-paper": {
                  width: 240
                }
              }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
