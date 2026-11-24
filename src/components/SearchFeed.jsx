
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utilities/fetchFromAPI";
import { Box, Typography } from "@mui/material";
import Videos from "./Videos";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { searchTerm } = useParams();

  useEffect(() => {
    let ignore = false;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError("");
      setVideos([]);

      try {
        const data = await fetchFromAPI(
          `search?part=snippet&type=video&q=${encodeURIComponent(searchTerm)}`
        );

        if (!ignore) {
          setVideos(data.items || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchSearchResults();

    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search results for:{" "}
        <span style={{ color: "#fc1503" }}>{searchTerm} videos</span>
      </Typography>

      {isLoading && (
        <Typography color="white">Loading videos...</Typography>
      )}

      {error && (
        <Typography color="error">
          Failed to load videos: {error}
        </Typography>
      )}

      {!isLoading && !error && (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
