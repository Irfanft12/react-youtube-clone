
import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    maxResults: 12,
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});

export const fetchFromAPI = async (endpoint) => {
  try {
    const { data } = await api.get(`/${endpoint}`);
    return data;
  } catch (error) {
    console.error(
      "YouTube API request failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};

let initialFeedPromise;

export const preloadInitialFeed = () => {
  if (!initialFeedPromise) {
    initialFeedPromise = fetchFromAPI(
      "search?part=snippet&type=video&q=New"
    );
  }

  return initialFeedPromise;
};
