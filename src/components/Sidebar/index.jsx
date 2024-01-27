import { useMediaQuery, useTheme } from "@mui/material";

import { NavBody } from "../NavBody";

export function Sidebar({ onSwitch }) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const match = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {match ? (
        <NavBody theme={theme} isDarkTheme={isDarkTheme} onSwitch={onSwitch} />
      ) : null}
    </>
  );
}
