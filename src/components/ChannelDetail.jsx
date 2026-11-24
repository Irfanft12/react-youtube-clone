
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utilities/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    let ignore = false;

    const fetchChannelData = async () => {
      setChannelDetail(null);
      setVideos(null);
      setError("");

      try {
        const [channelData, videoData] = await Promise.all([
          fetchFromAPI(`channels?part=snippet&id=${id}`),
          fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`),
        ]);

        if (!ignore) {
          setChannelDetail(channelData?.items?.[0] || null);
          setVideos(videoData?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          setError("Unable to load channel information. Please try again.");
          setVideos([]);
        }
      }
    };

    fetchChannelData();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!channelDetail) {
    return (
      <Box p={3}>
        <Typography color="white" variant="h6">
          Loading channel...
        </Typography>
      </Box>
    );
  }

  return (
    <Box minHeight="95vh">
      <Box>
        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(30,213,235,1) 0%, rgba(227,43,226,1) 100%)",
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>

      <Box display="flex" p={2}>
        <Box sx={{ mr: { sm: "auto" } }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;