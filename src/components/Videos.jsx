
import { Stack, Box, Typography } from "@mui/material";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos, direction = "row", width }) => {
  if (!videos) {
    return (
      <Typography color="white" variant="h6">
        Loading...
      </Typography>
    );
  }

  const validItems = videos.filter(
    (item) => item?.id?.videoId || item?.id?.channelId
  );

  if (!validItems.length) {
    return (
      <Typography color="white" variant="h6">
        No videos found. Try a different search term.
      </Typography>
    );
  }

  // Prioritize the first two video thumbnails
  const priorityVideoIds = new Set(
    validItems
      .filter((item) => item.id.videoId)
      .slice(0, 2)
      .map((item) => item.id.videoId)
  );

  return (
    <Stack
      direction={direction}
      flexWrap="wrap"
      sx={{ justifyContent: { md: "center", xs: "flex-start" } }}
      gap={2}
    >
      {validItems.map((item) => {
        const videoId = item.id.videoId;
        const channelId = item.id.channelId;

        return (
          <Box
            key={videoId || channelId}
            sx={{
              width: width ?? { md: "calc(25% - 16px)", xs: "100%" },
            }}
          >
            {videoId && (
              <VideoCard
                video={item}
                priority={priorityVideoIds.has(videoId)}
              />
            )}

            {channelId && (
              <ChannelCard channelDetail={item} />
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
