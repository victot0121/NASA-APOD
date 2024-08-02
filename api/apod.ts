import axios from 'axios';

const API_KEY = 'xsyGYqqHrv9zrNcIjBbgJ316hzzpcYuxblGwekg3';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export const fetchApodData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};



