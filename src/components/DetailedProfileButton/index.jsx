import { Box, Typography } from "@mui/material";
import ArrowDown from "../Icons/ArrowDown.svg?react";

export function DetailedProfileButton({
  userName = "Justin Bergson",
  userEmail = "justin@gmail.com",
  imageUrl = "/data/images/pexels-nappy-935969.jpg",
}) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "6px 8px",
        borderRadius: "28px",
        border: "1px solid #DADDDD",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          ">img": {
            borderRadius: "50%",
          },
        }}
      >
        <img
          width={"38px"}
          height={"38px"}
          src={imageUrl}
          alt="profile picture"
        />
      </Box>
      <Box>
        <Typography
          fontFamily={"Inter, sans-serif"}
          textAlign={"right"}
          color={"#26282C"}
          fontSize={"16px"}
          lineHeight={"normal"}
          className="user_name"
        >
          {userName}
        </Typography>
        <Typography
          fontFamily={"Inter, sans-serif"}
          textAlign={"right"}
          color={"#787486"}
          fontSize={"14px"}
          lineHeight={"normal"}
          className="user_email"
        >
          {userEmail}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowDown />
      </Box>
    </Box>
  );
}
