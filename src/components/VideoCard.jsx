import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { timeAgo } from "../utils/constants";
import { CardActionArea } from "@mui/material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => (
  <Card
    sx={{
      width: { xs: "auto", sm: "358px", md: "320px" },
      boxShadow: "none",
      borderRadius: 0,
      marginLeft: 0,
    }}
  >
    <CardActionArea>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          className=""
          sx={{
            width: { xs: "100%" },
            height: 180,
          }}
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: "#1E1E1E",
          height: "100px",
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#FFF"
            sx={{ width: { xs: "326px", md: "100%" } }}
          >
            {snippet?.title
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, "&")
              .slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>

          <Typography variant="subtitle2" color="gray">
            {timeAgo.format(Date.parse(snippet?.publishedAt))}
          </Typography>
        </Link>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default VideoCard;
