import { useState, useEffect } from "react"
import { fetchFromAPI } from "../utilities/fetchFromAPI"
import { Box, Typography } from "@mui/material"
import Videos from "./Videos"
import { useParams } from "react-router-dom"

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams()

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm])

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        <span
          style={{ marginRight: "10px" }}
          >
        Search results for:
        </span>
        <span style={{ color: "#fc1503" }}>{searchTerm} videos</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed