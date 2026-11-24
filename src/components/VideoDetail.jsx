
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utilities/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    let ignore = false;

    const fetchVideoAndSuggestions = async () => {
      setVideoDetail(null);
      setVideos(null);
      setError("");

      try {
        const videoData = await fetchFromAPI(
          `videos?part=contentDetails,snippet,statistics&id=${id}`
        );

        const currentVideo = videoData.items?.[0];

        if (!currentVideo) {
          throw new Error("Video not found.");
        }

        if (ignore) return;

        setVideoDetail(currentVideo);

        const title = currentVideo.snippet.title;

        const suggestionsData = await fetchFromAPI(
          `search?part=snippet&q=${encodeURIComponent(title)}&type=video`
        );

        const suggestedVideos = (suggestionsData.items || []).filter(
          (video) => video.id?.videoId !== id
        );

        if (!ignore) {
          setVideos(suggestedVideos);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching video details:", err);
          setError(err.message || "Unable to load video details.");
          setVideos([]);
        }
      }
    };

    fetchVideoAndSuggestions();

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

  if (!videoDetail?.snippet) {
    return (
      <Box p={3}>
        <Typography color="white" variant="h6">
          Loading video...
        </Typography>
      </Box>
    );
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics = {},
  } = videoDetail;

  const viewCount = Number(statistics.viewCount || 0);
  const likeCount = Number(statistics.likeCount || 0);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {viewCount.toLocaleString()} views
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {likeCount.toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          className="test"
        >
          <Videos videos={videos} direction="column" width="100%" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;