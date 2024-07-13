import {
  Avatar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode, logout } from "../../store/userReducer";
import { FlexBetween } from "../ui";
import { RootState } from "../../store/store";
import { UserType } from "../../enums";

import logo from "../../assets/images/logo.png";

function Navbar({ hide }: { hide: boolean }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(
    useSelector((state: RootState) => state.user.token)
  );
  const user = useSelector((state: RootState) => state.user.user);

  // States and functions to handle opening and closing the menus
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Function to handle navigation to other pages
  const handleNavigation = (path: string) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    navigate(path);
  };

  // Function to change the mode (dark, light)
  const changeMode = () => {
    dispatch(setMode());
  };

  // Function to logout the user
  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/");
      handleCloseUserMenu();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      hidden={hide}
      style={{
        borderBottom:
          theme.palette.mode === "dark" ? "1px solid #fff" : "1px solid #000",
      }}
    >
      <Container>
        <Toolbar className="flex justify-between">
          {/* Logo on large screens */}
          <div className="hidden md:flex">
            <Link to="/">
              <div className="flex gap-3 items-center">
                <img src={logo} alt="logo" className="h-12" />
                <h6 className="mr-2 font-mono text-xl font-bold uppercase">
                  Intelli-Talent
                </h6>
              </div>
            </Link>
          </div>

          {/* Menu button on small screens */}
          <div className="flex md:hidden">
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              className="block md:hidden"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {!isLoggedIn && (
                <MenuItem onClick={() => handleNavigation("/")}>
                  <p className="text-center">Home</p>
                </MenuItem>
              )}

              {isLoggedIn && [
                <MenuItem key="user" onClick={() => handleNavigation("/user")}>
                  <p className="text-center">
                    {user?.type === UserType.jobSeeker ? "Profiles" : "Jobs"}
                  </p>
                </MenuItem>,
                user?.type === UserType.jobSeeker && [
                  <MenuItem
                    key="quizzes"
                    onClick={() => handleNavigation("/quizzes")}
                  >
                    <p className="text-center">Quizzes</p>
                  </MenuItem>,
                  <MenuItem
                    key="interviews"
                    onClick={() => handleNavigation("/interviews")}
                  >
                    <p className="text-center">Interviews</p>
                  </MenuItem>,
                ],
              ]}

              <MenuItem onClick={() => handleNavigation("/jobs")}>
                <p className="text-center">Find Jobs</p>
              </MenuItem>
            </Menu>
          </div>

          {/* Logo on small screens */}
          <h5 className="hidden sm:flex md:hidden font-mono text-lg font-bold uppercase">
            <Link to="/">Intelli-Talent</Link>
          </h5>

          {/* Menu items on large screens */}
          <div className="hidden md:flex">
            {!isLoggedIn && (
              <Button
                onClick={() => handleNavigation("/")}
                className="block mx-3"
                color="inherit"
                style={{
                  borderBottom:
                    window.location.pathname === "/" ? "1px solid" : "none",
                }}
              >
                Home
              </Button>
            )}

            {isLoggedIn && (
              <>
                <Button
                  onClick={() => handleNavigation("/user")}
                  className="block mx-3"
                  color="inherit"
                  style={{
                    borderBottom:
                      window.location.pathname === "/user"
                        ? "1px solid"
                        : "none",
                  }}
                >
                  {user?.type === UserType.jobSeeker ? "Profiles" : "Jobs"}
                </Button>

                {user?.type === UserType.jobSeeker && (
                  <>
                    <Button
                      onClick={() => handleNavigation("/quizzes")}
                      className="block mx-3"
                      color="inherit"
                      style={{
                        borderBottom:
                          window.location.pathname === "/quizzes"
                            ? "1px solid"
                            : "none",
                      }}
                    >
                      <p className="text-center">Quizzes</p>
                    </Button>

                    <Button
                      onClick={() => handleNavigation("/interviews")}
                      className="block mx-3"
                      color="inherit"
                      style={{
                        borderBottom:
                          window.location.pathname === "/interviews"
                            ? "1px solid"
                            : "none",
                      }}
                    >
                      <p className="text-center">Interviews</p>
                    </Button>
                  </>
                )}
              </>
            )}

            <Button
              onClick={() => handleNavigation("/jobs")}
              className="block mx-3"
              color="inherit"
              style={{
                borderBottom:
                  window.location.pathname === "/jobs" ? "1px solid" : "none",
              }}
            >
              Find Jobs
            </Button>
          </div>

          {/* (Sign up, Sign in) or (Avatar and settings) */}
          <FlexBetween>
            <IconButton
              sx={{ mr: 1 }}
              onClick={changeMode}
              color="inherit"
              aria-label="Change Theme"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt={user?.firstName} src={user?.photo} />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  className="mt-12"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user?.type === UserType.jobSeeker && (
                    <MenuItem
                      onClick={() =>
                        handleNavigation("/user/auto-fill-extension/edit")
                      }
                    >
                      <p className="text-center">
                        Edit Autofill Extenstion Fields
                      </p>
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => handleNavigation("/user/edit")}>
                    <p className="text-center">Edit Profile</p>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <p className="text-center">Logout</p>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <div>
                  <Button
                    className="block"
                    color="inherit"
                    onClick={() => navigate("/auth/sign-up")}
                  >
                    Signup
                  </Button>
                  <Button
                    className="block"
                    color="inherit"
                    onClick={() => navigate("/auth/sign-in")}
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </FlexBetween>
        </Toolbar>
      </Container>
    </nav>
  );
}

export default Navbar;
