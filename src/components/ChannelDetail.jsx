import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import Videos from "./Videos"
import ChannelCard from "./ChannelCard"
import { fetchFromAPI } from "../utilities/fetchFromAPI"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams()

  console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then(data => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then(data => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{ 
          background: "linear-gradient(90deg, rgba(30,213,235,1) 0%, rgba(227,43,226,1) 100%, rgba(30,213,235,1) 100%)",
          zIndex: 10,
          height: "300px"
         }} />
         <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p={2}>
         <Box sx={{ mr: { sm: 'auto', } }}>
          <Videos videos={videos} />
         </Box>
      </Box>
    </Box>
  )
}

export default ChannelDetail