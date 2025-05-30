import axios from "axios";

axios.defaults.baseURL = https://api.unsplash.com;

export const fetchData = async (searchValue, currentPage) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiInstans = axios.get("/search/photos", {
    params: {
      query: searchValue,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: Client-ID ${apiKey},
    },
  });
  return apiInstans;
};