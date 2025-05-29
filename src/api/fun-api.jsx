import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/';
const KEY_ID = '76YFQ0LUyPvjVwj6tmIY34NXYLiz7iDoOn_Z9oT6DRQ';

export async function fetchImages(query, page) {
  const response = await axios(BASE_URL + 'search/photos/', {
    params: { client_id: KEY_ID, query: query, page: page },
  });
  return response.data;
}