import { Stack, Box } from "@mui/material"
import ChannelCard from "./ChannelCard"
import VideoCard from "./VideoCard"

const Videos = ({ videos, direction, width }) => {
    if (!videos?.length) return "Loading..."
  return (
    <Stack 
    direction={ direction || "row" }
    flexWrap="wrap"
    sx={{ justifyContent: { md: "center", xs: "flex-start" } }}
    gap={2}
      >
        {videos.map((item, index) => (
            <Box key={index}
              sx={{ width: { md: "calc(25% - 16px)", xs: "100%" } }}
              style={{ width: width ? width : "" }}
            >
                {item.id.videoId && <VideoCard video={item} />}
                {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
        ))}
    </Stack>
  )
}

export default Videos