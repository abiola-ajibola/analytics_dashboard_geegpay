import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box, Link } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { simpleFaker as faker } from "@faker-js/faker";
import { Topbar } from "./components/Topbar";
import { getRequest } from "./utils/getRequest";
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
import { ProgressBar } from "./components/ProgressBar";

const darkTheme = createTheme(darkThemeConfig);

const lightTheme = createTheme(lightThemeConfig);

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "14px",
}));

function App() {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: () => getRequest("/data/orders.json"),
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
              gridTemplateColumns: "1.63fr 1fr",
              gap: "20px",
              margin: "20px",
              // overflowY: "auto",
              marginLeft: { md: "100px", xs: "20px" },
            }}
          >
            <StyledBox sx={{ padding: "20px 16px", maxHeight: "374px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TypoJakarta
                  fontWeight={600}
                  fontSize="18px"
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
              gridTemplateColumns={"1fr 1fr"}
              gap="16px"
              sx={{ backgroundColor: "transparent" }}
            >
              <InfoCard
                Icon={BoxIcon}
                pctChange={faker.number.int({ min: -100, max: 100 })}
                title={"Total Order"}
                value={faker.number.int({ min: 100, max: 2000 })}
              />
              <InfoCard
                Icon={ReturnIcon}
                pctChange={faker.number.int({ min: -100, max: 100 })}
                title={"Total Refund"}
                value={faker.number.int({ min: 100, max: 2000 })}
              />
              <InfoCard
                Icon={ShoppingCartIcon}
                pctChange={faker.number.int({ min: -100, max: 100 })}
                title={"Average Sales"}
                value={faker.number.int({ min: 100, max: 2000 })}
              />
              <InfoCard
                Icon={CoinsIcon}
                pctChange={faker.number.int({ min: -100, max: 100 })}
                title={"Total Income"}
                value={faker.number.int({ min: 100, max: 2000 })}
              />
            </StyledBox>
            <StyledBox padding={"20px"}>
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
              {isLoading ? null : <OrdersTable rows={data} />}
            </StyledBox>
            <StyledBox padding={"20px"}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TypoJakarta
                  fontWeight={600}
                  fontSize="18px"
                  lineHeight="24px"
                  color={theme.palette.text_.black_2}
                >
                  Top Platform
                </TypoJakarta>
                <Box display={"flex"}>
                  <TypoJakarta>
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
              <ProgressBar
                amount={faker.number.int({ min: 100_000, max: 5_000_000 })}
                pctChng={faker.number.int({ min: -100, max: 100 })}
                title={"Book Bazaar"}
                value={faker.number.int({ min: 0, max: 100 })}
                slider_color="puple"
              />
              <ProgressBar
                amount={faker.number.int({ min: 100_000, max: 5_000_000 })}
                pctChng={faker.number.int({ min: -100, max: 100 })}
                title={"Book Bazaar"}
                value={faker.number.int({ min: 0, max: 100 })}
                slider_color="orange"
              />
              <ProgressBar
                amount={faker.number.int({ min: 100_000, max: 5_000_000 })}
                pctChng={faker.number.int({ min: -100, max: 100 })}
                title={"Book Bazaar"}
                value={faker.number.int({ min: 0, max: 100 })}
                slider_color="blue"
              />
              <ProgressBar
                amount={faker.number.int({ min: 100_000, max: 5_000_000 })}
                pctChng={faker.number.int({ min: -100, max: 100 })}
                title={"Book Bazaar"}
                value={faker.number.int({ min: 0, max: 100 })}
                slider_color="red_1"
              />
            </StyledBox>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
