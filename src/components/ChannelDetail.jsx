import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Videos, ChannelCard } from "./";

import { fetchAPI } from "../utils/fetchAPI";
import { CardMedia } from "@mui/material";

const ChannelDetail = () => {
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      console.log(data);
      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <CardMedia
          image={channelDetail?.brandingSettings?.image?.bannerExternalUrl}
          alt={channelDetail?.snippet?.title}
          sx={{
            // background:
            //   "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
