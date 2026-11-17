import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Box, Stack, Typography } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import Videos from "./Videos"
import { fetchFromAPI } from "../utilities/fetchFromAPI"

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)

  const { id } = useParams()


useEffect(() => {
  const fetchVideoAndSuggestions = async () => {
    try {
      // Fetch current video details
      const videoData = await fetchFromAPI(
        `videos?part=contentDetails,snippet,statistics&id=${id}`
      );

      const currentVideo = videoData.items?.[0];

      if (!currentVideo) return;

      setVideoDetail(currentVideo);

      // Search for videos using the current video's title
      const title = currentVideo.snippet.title;

      const suggestionsData = await fetchFromAPI(
        `search?part=snippet&q=${encodeURIComponent(title)}&type=video`
      );

      // Exclude the currently playing video
      const suggestedVideos = (suggestionsData.items || []).filter(
        (video) => video.id?.videoId !== id
      );

      setVideos(suggestedVideos);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setVideos([]);
    }
  };

  fetchVideoAndSuggestions();
}, [id]);


  if (!videoDetail?.snippet) return "Loading..."

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail


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
               <Typography color="#fff" variant="h5" fontWeight="bold" p={2} >
                { title }
               </Typography>
               <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
               <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#fff" >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
               </Link>
               <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  { parseInt(viewCount).toLocaleString() } views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  { parseInt(likeCount).toLocaleString() } likes
                </Typography>
               </Stack>

               </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" className="test" >
          <Videos videos={videos} direction="column" width="100%" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail