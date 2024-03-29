import { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Link } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Barchart } from "./components/Barchart";
import { ChartDropdown } from "./components/ChartDropdown";
import { TypoJakarta } from "./components/Typography/TypoJakarta";
import { InfoCard } from "./components/InfoCard";
import { darkThemeConfig, lightThemeConfig } from "./constants/themeConfig";
import BoxIcon from "./components/Icons/BoxColored.svg?react";
import ReturnIcon from "./components/Icons/Rotate3D.svg?react";
import ShoppingCartIcon from "./components/Icons/ShoppingCart.svg?react";
import CoinsIcon from "./components/Icons/Coins.svg?react";
import { OrdersTable } from "./components/OrdersTable";
import { TopPlatforms } from "./components/TopPlatforms";

const darkTheme = createTheme(darkThemeConfig);

const lightTheme = createTheme(lightThemeConfig);

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "14px",
}));

function App() {
  const [theme, setTheme] = useState(lightTheme);
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
      <Box display={{ md: "flex" }}>
        <Box component="aside" position={"fixed"}>
          <Sidebar onSwitch={handleThemeSwitch} />
        </Box>
        <Box width={"100%"}>
          <Topbar onSwitch={handleThemeSwitch} />
          <Box
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.63fr 1fr" },
              gap: "20px",
              margin: "20px",
              marginLeft: { md: "100px", xs: "20px" },
            }}
          >
            <StyledBox sx={{ padding: "20px 16px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TypoJakarta
                  fontWeight={600}
                  fontSize={{ xs: "12px", sm: "18px" }}
                  lineHeight="24px"
                  color={theme.palette.text_.black_2}
                >
                  Sales Trends
                </TypoJakarta>
                <Box display={"flex"}>
                  <TypoJakarta
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="22px"
                    color={theme.palette.text_.grey_black}
                    position={"relative"}
                    top={"8px"}
                  >
                    Sort by:
                  </TypoJakarta>{" "}
                  <ChartDropdown />
                </Box>
              </Box>
              <Barchart />
            </StyledBox>
            <StyledBox
              display={"grid"}
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
              gap="16px"
              sx={{ backgroundColor: "transparent" }}
            >
              <InfoCard
                Icon={BoxIcon}
                title={"Total Order"}
                dataEndoint={"/data/order_history.json"}
                queryKey={["order_history"]}
              />
              <InfoCard
                Icon={ReturnIcon}
                title={"Total Refund"}
                dataEndoint={"/data/refunds.json"}
                queryKey={["refunds"]}
              />
              <InfoCard
                Icon={ShoppingCartIcon}
                title={"Average Sales"}
                dataEndoint={"/data/average_sales.json"}
                queryKey={["average_sales"]}
              />
              <InfoCard
                Icon={CoinsIcon}
                title={"Total Income"}
                dataEndoint={"/data/total_income.json"}
                queryKey={["total_income"]}
              />
            </StyledBox>
            <StyledBox maxWidth={"calc(100vw - 40px)"} padding={"20px"}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TypoJakarta
                  fontWeight={600}
                  fontSize="18px"
                  lineHeight="24px"
                  color={theme.palette.text_.black_2}
                >
                  Last Orders
                </TypoJakarta>
                <Box display={"flex"}>
                  <TypoJakarta mb={"14px"}>
                    <Link
                      href="#seeAll"
                      fontSize="18px"
                      fontWeight={500}
                      lineHeight="26px"
                      color={theme.palette.text_.accent}
                      sx={{ textDecoration: "none" }}
                    >
                      See All
                    </Link>
                  </TypoJakarta>
                </Box>
              </Box>
                <Box>
                  <OrdersTable />
                </Box>
            </StyledBox>
            <StyledBox padding={"20px"}>
              <TopPlatforms />
            </StyledBox>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
