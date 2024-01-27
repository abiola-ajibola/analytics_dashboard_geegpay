import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Logo from "../Icons/Logo.svg?react";
import Category from "../Icons/Category.svg?react";
import TrendUp from "../Icons/TrendUp.svg?react";
import Profile from "../Icons/Profile.svg?react";
import BoxIcon from "../Icons/Box.svg?react";
import Discount from "../Icons/Discount.svg?react";
import Info from "../Icons/Info.svg?react";
import Moon from "../Icons/Moon.svg?react";
import Sunshine from "../Icons/Sunshine.svg?react";
import ArrowRight from "../Icons/ArrowRight.svg?react";
import Setting from "../Icons/Setting.svg?react";
import Logout from "../Icons/Logout.svg?react";

function IconWrapper({ children, href, color = "#B2ABAB" }) {
  return (
    <IconButton
      href={href}
      sx={{ padding: "8px", margin: "0 3px 16px 3px", color }}
    >
      {children}
    </IconButton>
  );
}

function ToggleButtonWrapper({
  backgroundColor = undefined,
  marginBottom = undefined,
  children,
}) {
  return (
    <Box
      sx={{
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor,
        marginBottom,
      }}
      component="nav"
    >
      {children}
    </Box>
  );
}

export function NavBody({ theme, isDarkTheme, onSwitch }) {
  return (
    <Box
      sx={{
        width: 80,
        padding: "20px 17px",
        height: "100vh",
        backgroundColor: theme.palette.background.paper_2,
        borderRight: "1px solid #EBECF2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        // overflowX: "hidden"
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box className="top_items">
        <Box
          className="logo_wrapper"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <IconButton
            href="/"
            sx={{ padding: 0, backgroundColor: theme.palette.common.white }}
          >
            <Logo />
          </IconButton>
        </Box>
        <Box>
          <IconWrapper href={"#category"}>
            <Category />
          </IconWrapper>
          <IconWrapper href={"#trend"}>
            <TrendUp />
          </IconWrapper>
          <IconWrapper href={"#profile"}>
            <Profile />
          </IconWrapper>
          <IconWrapper href={"#box"} color="#B7B0B0">
            <BoxIcon />
          </IconWrapper>
          <IconWrapper href={"#discount"}>
            <Discount />
          </IconWrapper>
          <IconWrapper href={"#info"}>
            <Info />
          </IconWrapper>
          <Box
            sx={{
              padding: "8px",
              borderRadius: "23px",
              backgroundColor: theme.palette.common.white,
            }}
            className="theme_toggle_wrapper"
          >
            {isDarkTheme ? (
              <ToggleButtonWrapper marginBottom="16px">
                <IconButton
                  sx={{ color: theme.palette.gray }}
                  onClick={() => onSwitch("light")}
                  disableRipple
                >
                  <Sunshine width="30px" height="30px" />
                </IconButton>
              </ToggleButtonWrapper>
            ) : (
              <ToggleButtonWrapper
                backgroundColor={theme.palette.accent_color}
                marginBottom="16px"
              >
                <IconButton
                  sx={{ color: theme.palette.common.white }}
                  onClick={() => onSwitch("light")}
                  disableRipple
                >
                  <Sunshine />
                </IconButton>
              </ToggleButtonWrapper>
            )}
            {isDarkTheme ? (
              <ToggleButtonWrapper backgroundColor={theme.palette.accent_color}>
                <IconButton
                  sx={{ color: theme.palette.common.white }}
                  onClick={() => onSwitch("dark")}
                  disableRipple
                >
                  <Moon width="18px" height="18px" />
                </IconButton>
              </ToggleButtonWrapper>
            ) : (
              <ToggleButtonWrapper>
                <IconButton
                  sx={{ color: theme.palette.gray }}
                  onClick={() => onSwitch("dark")}
                  disableRipple
                >
                  <Moon />
                </IconButton>
              </ToggleButtonWrapper>
            )}
          </Box>
        </Box>
      </Box>
      <Box className="bottom_items">
        <Box>
          <IconWrapper href={"#arrow"}>
            <ArrowRight />
          </IconWrapper>
          <IconWrapper href={"#settings"}>
            <Setting />
          </IconWrapper>
          <IconButton
            sx={{
              padding: "8px",
              margin: "0 3px 0px 3px",
              color: theme.palette.gray,
            }}
            href={"#logout"}
          >
            <Logout />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
