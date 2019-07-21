import axios from "axios";

const KEY = "AIzaSyAekeVfVutpJkQBTmfMd_5xcKSXZhJ3MFY";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});
