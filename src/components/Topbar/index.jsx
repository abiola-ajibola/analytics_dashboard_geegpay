import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  useTheme,
  Menu,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import { NavBody } from "../NavBody";
import { DetailedProfileButton } from "../DetailedProfileButton";
import SearchIcon from "../Icons/Search.svg?react";
import CarlendaIcon from "../Icons/Carlenda.svg?react";
import NotificationIcon from "../Icons/Notification.svg?react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../utils/getRequest";

const now = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "24px",
  height: "48px",
  backgroundColor: theme.palette.background.neutral_white,
  border: theme.border.grey,
  width: "auto",
  [theme.breakpoints.up("lg")]: {
    marginLeft: theme.spacing(3),
    width: "349px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#78828A",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
    height: "24px",
    marginTop: "3px",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + 26px)`,
    transition: theme.transitions.create("width"),
    color: "#0D062D",
    width: "100%",
    "::placeholder": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
      color: theme.palette.text_.neutral_400,
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Topbar({ onSwitch }) {
  const { isLoading, data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getRequest("/data/notifications.json"),
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const theme = useTheme();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(notificationsAnchorEl);
  const unreadNotifications = isLoading
    ? []
    : notifications.filter(({ read }) => read);
  const isDarkTheme = theme.palette.mode === "dark";

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const notificationsMenuId = "notifications-menu";
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationOpen}
      onClose={handleNotificationMenuClose}
    >
      {unreadNotifications.map(({ message, id }) => (
        <MenuItem key={id} onClick={handleNotificationMenuClose}>
          {message}
        </MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotificationMenuOpen}>
        <IconButton aria-label="show notifications" size="large">
          <Badge
            badgeContent={isLoading ? null : unreadNotifications.length}
            color="error"
          >
            <NotificationIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          boxShadow: "none",
          borderBottom: "1px solid #E5EAEF",
          color: "inherit",
        }}
        // position="static"
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, display: { md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            container={() => window.document.body}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { md: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 80,
              },
            }}
          >
            <NavBody
              isDarkTheme={isDarkTheme}
              theme={theme}
              onSwitch={onSwitch}
            />
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", lg: "block" },
              marginLeft: { md: "80px" },
            }}
          >
            Dashboard
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box
            sx={{
              padding: "12px 16px",
              margin: " 0 20px 0 22px",
              color: theme.palette.text_.black_2,
              display: "flex",
            }}
          >
            <CarlendaIcon />
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
                marginLeft: "10px",
              }}
            >{`${
              months[now.getMonth()]
            } ${now.getDate()}, ${now.getFullYear()}`}</Typography>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                padding: "11px",
                marginRight: "20px",
                border: theme.border.grey,
              }}
              aria-label="show notifications"
              aria-controls={notificationsMenuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
            >
              <Badge
                badgeContent={isLoading ? null : unreadNotifications.length}
                color="error"
              >
                <NotificationIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              disableRipple
            >
              <DetailedProfileButton />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationsMenu}
    </Box>
  );
}
