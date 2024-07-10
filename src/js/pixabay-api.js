import axios from 'axios';

const API_KEY = '44784729-ebc9a0f5cc587c2700d41657d';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;
const perPage = 15; // Кількість зображень на сторінці

export async function getPicturesByQuery(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
