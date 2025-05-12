import axios from "./axiosInstance";

const API_KEY = process.env.VUE_APP_API_KEY;

export async function searchYouTube(query, maxResults = 20) {
  const response = await axios.get("/search", {
    params: {
      part: "snippet",
      maxResults,
      q: query,
      key: API_KEY,
      type: "video",
    },
  });

  return response.data.items;
}

export async function getVideoDetails(ids) {
  const response = await axios.get("/videos", {
    params: {
      part: "contentDetails,statistics",
      id: ids.join(","),
      key: API_KEY,
    },
  });

  const detailsMap = {};
  response.data.items.forEach((item) => {
    detailsMap[item.id] = {
      duration: item.contentDetails.duration,
      views: item.statistics.viewCount,
    };
  });

  return detailsMap;
}
