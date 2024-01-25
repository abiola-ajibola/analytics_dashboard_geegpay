import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import { Topbar } from "./components/Topbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    accent_color: "#34CAA5",
    gray: "#B2ABAB",
    background: { default: "#121212", paper: "#272727" },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    accent_color: "#34CAA5",
    gray: "#B2ABAB",
    background: { paper: "#F7F8FA", default: "#FAFAFA" },
  },
});

const queryFn = async () => {
  const response = await fetch("/data/sample.json");
  const data = await response.json();
  return data;
};

function App() {
  const query = useQuery({
    queryKey: ["sample"],
    queryFn,
    staleTime: Infinity,
    refetchOnMount: false,
  });
  const [theme, setTheme] = useState(lightTheme);
  const { data, isLoading } = query;
  const handleThemeSwitch = (mode) => {
    if (mode === theme.palette.mode) return;
    mode === lightTheme.palette.mode
      ? setTheme(lightTheme)
      : setTheme(darkTheme);
  };
  console.log({ theme });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={{ md: "flex" }} sx={{width: "100vw"}}>
        <Box component="aside">
          <Sidebar onSwitch={handleThemeSwitch} />
        </Box>
        <Box component="main">
          <Topbar />
          <pre>
            {" "}
            {isLoading ? "Loading ..." : JSON.stringify(data, null, 2)}
          </pre>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
