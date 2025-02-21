import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import useStore from "../store";
import Logo from "../assets/logo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "Rent Car", path: "/rent" },
  { name: "Start Business", path: "/business" },
];

function Navbar() {
  const { user, logout } = useStore();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Toolbar disableGutters>
        {/* LOGO - Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
          <img src={Logo} alt="logo" style={{ width: "80px", height: "80px" }} />
        </Box>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MONKEY CABS
        </Typography>

        {/* Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to={page.path}
                  sx={{
                    textAlign: "center",
                    textDecoration: "none",
                    color: location.pathname === page.path ? "blue" : "black",
                  }}
                >
                  {page.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* LOGO - Mobile */}
        <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
          <img src={Logo} alt="logo" style={{ width: "80px", height: "80px" }} />
        </Box>

        {/* Title for Mobile */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontSize: "10px",
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MONKEY CABS
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", marginLeft: "13%" } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={Link}
              to={page.path}
              sx={{
                my: 2,
                marginLeft: "5%",
                color: location.pathname === page.path ? "rgb(225, 193, 110)" : "white",
                display: "block",
                textTransform: "capitalize",
                fontWeight: location.pathname === page.path ? "bold" : "normal",
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* Profile & Login/Logout */}
        <Box sx={{ flexGrow: 0 }}>
          {user ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src={user.profile} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="rgb(225, 193, 110)" variant="contained" sx={{ marginRight: 1,backgroundColor:'brown' }}>
                Login
              </Button>
              <Button component={Link} to="/signin" color="rgb(225, 193, 110)" variant="outlined">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
