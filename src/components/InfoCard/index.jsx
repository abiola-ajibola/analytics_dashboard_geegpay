import { Box, useTheme, Typography, styled } from "@mui/material";
import { AreaChart } from "../AreaChart";
import { TypoJakarta } from "../Typography/TypoJakarta";
import TrendUpIcon from "../Icons/TrendUpSmall.svg?react";
import TrendDownIcon from "../Icons/TrendDownSmall.svg?react";
import { useApi } from "../../utils/hooks/useApi";

const StyledTag = styled(Box)(
  ({ theme, value }) => `
  padding: 4px 8px;
  background-color: ${
    value < 0
      ? theme.palette.background.red_1
      : theme.palette.background.accent_color
  }1f;
  color: ${value < 0 ? theme.palette.text_.red_1 : theme.palette.text_.accent};
  border-radius: 12px;
  display: flex;
  height: 24px;
  align-items: center;
  min-width: 70px;
`
);

const StyledBox = styled(Box)(
  () => `
  margin-right: 4px;
`
);

function Tag({ value }) {
  return (
    <StyledTag value={value}>
      <StyledBox component={"span"} value={value}>
        {value < 0 ? <TrendDownIcon /> : <TrendUpIcon />}
      </StyledBox>
      <TypoJakarta lineHeight={"16px"} fontSize={"12px"} fontWeight={500}>
        {value}%
      </TypoJakarta>
    </StyledTag>
  );
}

export function InfoCard({ Icon, title, dataEndoint, queryKey }) {
  const query = useApi({ endpoint: dataEndoint, queryKey });
  const { data, isLoading } = query;
  const theme = useTheme();
  return isLoading ? null : (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "14px",
        border: "1px solid #EDF2F7",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} mb={"10px"}>
        <Box
          className="icon_wrapper"
          sx={{
            width: "40px",
            height: "40px",
            border: "1px solid #E6E6E6",
            borderRadius: "20px",
            padding: "8px",
          }}
        >
          <Icon />
        </Box>
        <Box className="chart_wrapper" height={"32px"} width={"104px"}>
          <AreaChart data={data.chartData} pctChange={data.pctChange} />
        </Box>
      </Box>
      <TypoJakarta
        fontSize={"18px"}
        fontWeight={500}
        lineHeight={"26px"}
        color={theme.palette.text_.neutral_3}
        mb={"5px"}
      >
        {title}
      </TypoJakarta>
      <TypoJakarta
        fontSize={"24px"}
        fontWeight={600}
        lineHeight={"32px"}
        color={theme.palette.text_.grey_black}
        mb={"10px"}
      >
        {data.value}
      </TypoJakarta>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Tag value={data.pctChange} />
        </Box>
        <Typography
          fontFamily="'Inter', 'sans-serif'"
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"normal"}
          color={theme.palette.text_.grey_neutral_4}
          marginLeft={"10px"}
        >
          vs. previous month
        </Typography>
      </Box>
    </Box>
  );
}
