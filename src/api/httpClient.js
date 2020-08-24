import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // timeout: 1000 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpClientAuth = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // timeout: 1000 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient, httpClientAuth };
