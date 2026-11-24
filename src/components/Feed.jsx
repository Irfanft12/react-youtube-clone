
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utilities/fetchFromAPI";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchVideos = async () => {
      setVideos(null);
      setError("");

      try {
        const data = await fetchFromAPI(
          `search?part=snippet&type=video&q=${encodeURIComponent(selectedCategory)}`
        );

        if (!ignore) {
          setVideos(data.items || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching feed videos:", err);
          setError("Unable to load videos. Please try again.");
          setVideos([]);
        }
      }
    };

    fetchVideos();

    return () => {
      ignore = true;
    };
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          variant="body2"
          className="copyright"
          sx={{ mt: 1.5, color: "#ffffff" }}
        >
          Copyright 2022 Youtube Clone
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          <span style={{ marginRight: "10px" }}>{selectedCategory}</span>
          <span style={{ color: "#fc1503" }}>Videos</span>
        </Typography>

        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;