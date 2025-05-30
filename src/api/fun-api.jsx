import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/';
const KEY_ID = '76YFQ0LUyPvjVwj6tmIY34NXYLiz7iDoOn_Z9oT6DRQ';

export const fetchData = async (query, page) => {
  return await axios.get(`${BASE_URL}search/photos`, {
    params: {
      client_id: KEY_ID,
      query: query,
      page: page,
      per_page: 12,
    },
  });
};