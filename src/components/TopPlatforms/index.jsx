import { Box, Link, useTheme } from "@mui/material";
import { TypoJakarta } from "../Typography/TypoJakarta";
import { ProgressBar } from "../ProgressBar";
import { useApi } from "../../utils/hooks/useApi";

export function TopPlatforms() {
  const theme = useTheme();
  const { data, isLoading } = useApi({
    endpoint: "/data/platforms.json",
    queryKey: ["platforms"],
  });
  return isLoading ? null : (
    <>
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
        amount={data.book_bazar.value}
        title={"Book Bazaar"}
        value={data.book_bazar.change}
        slider_color="puple"
      />
      <ProgressBar
        amount={data.artisan_aisle.value}
        title={"Artisan Aisle"}
        value={data.artisan_aisle.change}
        slider_color="orange"
      />
      <ProgressBar
        amount={data.toy_troop.value}
        title={"Toy Troop"}
        value={data.toy_troop.change}
        slider_color="blue"
      />
      <ProgressBar
        amount={data.x_store.value}
        title={"XStore"}
        value={data.x_store.change}
        slider_color="red_1"
      />
    </>
  );
}
