
import { useEffect, useState } from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utilities/constants";

const ChannelCard = ({ channelDetail, marginTop }) => {
  const channelId = channelDetail?.id?.channelId || channelDetail?.id;
  const channelTitle = channelDetail?.snippet?.title;

  const thumbnails = [
    channelDetail?.snippet?.thumbnails?.high?.url,
    channelDetail?.snippet?.thumbnails?.medium?.url,
    channelDetail?.snippet?.thumbnails?.default?.url,
  ].filter(Boolean);

  const [imageIndex, setImageIndex] = useState(0);

  // Update the image when a different channel is displayed.
  useEffect(() => {
    setImageIndex(0);
  }, [channelDetail?.id]);

  const imageSrc =
    thumbnails[imageIndex] || "/images/avatar-fallback.svg";

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { md: "320px", xs: "100%" },
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={channelId ? `/channel/${channelId}` : "#"}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            component="img"
            image={imageSrc}
            alt={channelTitle || "Channel profile"}
            width="180"
            height="180"
            loading="eager"
            onError={() => {
              setImageIndex((current) => current + 1);
            }}
            sx={{
              borderRadius: "50%",
              width: "180px",
              height: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
              objectFit: "cover",
            }}
          />

          <Typography variant="h6">
            {channelTitle}
            <CheckCircle
              sx={{ fontSize: 14, color: "gray", ml: "5px" }}
            />
          </Typography>

          {channelDetail?.statistics?.subscriberCount && (
            <Typography>
              {Number(
                channelDetail.statistics.subscriberCount
              ).toLocaleString()} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;