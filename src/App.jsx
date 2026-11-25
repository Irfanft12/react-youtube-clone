
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "./components/Navbar";

const Feed = lazy(() => import("./components/Feed"));
const VideoDetail = lazy(() => import("./components/VideoDetail"));
const ChannelDetail = lazy(() => import("./components/ChannelDetail"));
const SearchFeed = lazy(() => import("./components/SearchFeed"));

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Navbar />

      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress sx={{ color: "#fc1503" }} />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Suspense>
    </Box>
  </BrowserRouter>
);

export default App;