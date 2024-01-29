import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { TypoJakarta } from "../Typography/TypoJakarta";

const ProgressTypo = styled(TypoJakarta)(({ theme, color_variant, weight }) => {
  const color = theme.palette.text_[color_variant];
  return `
  font-size: 18px;
  font-style: normal;
  font-weight: ${weight ? weight : 600};
  line-height: 26px;
  color: ${color};
`;
});

const StyledProgressBar = styled(LinearProgress)(({ theme, slider_color }) => {
  const sliderColor = theme.palette.background[slider_color];
  return `
 .MuiLinearProgress-bar1Determinate {
    background-color: ${sliderColor};
    border-radius: 6px;
}
background-color: ${theme.palette.background.grey_2};
`;
});

export function ProgressBar({
  value,
  title,
  amount,
  slider_color = "purple",
}) {
  return (
    <Box mt={"20px"}>
      <ProgressTypo mb={"17px"} color_variant="black_3">
        {title}
      </ProgressTypo>
      <Box sx={{ width: "100%" }}>
        <StyledProgressBar
          sx={{ height: "12px", borderRadius: "6px" }}
          variant="determinate"
          value={value}
          slider_color={slider_color}
        />
      </Box>
      <ProgressTypo
        mt={"16px"}
        display={"flex"}
        justifyContent={"space-between"}
        weight={400}
        color_variant="neutral_600"
      >
        <Box component={"span"}>${amount.toLocaleString("US")}</Box>
        <Box component={"span"}>{value}%</Box>
      </ProgressTypo>
    </Box>
  );
}
