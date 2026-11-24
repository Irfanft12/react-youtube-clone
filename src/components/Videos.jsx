
import { Stack, Box, Typography } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos, direction, width }) => {
  if (!videos) {
      return (
        <Typography color="white" variant="h6">
          Loading...
        </Typography>
      )
  }
  if (!videos.length) return "No videos found.";

  const validItems = videos.filter(
    (item) => item?.id?.videoId || item?.id?.channelId
  );

  if (!validItems.length) {
    console.log("validItems")
  return (
    <Typography color="white" variant="h6">
      No videos found. Try a different search term.
    </Typography>
  );
}

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      sx={{ justifyContent: { md: "center", xs: "flex-start" } }}
      gap={2}
    >
      {validItems.map((item) => (
        <Box
          key={item.id.videoId || item.id.channelId}
          sx={{
            width: width || { md: "calc(25% - 16px)", xs: "100%" },
          }}
        >
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
