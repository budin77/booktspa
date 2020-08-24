import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const httpClient = axios;
const httpClientAuth = axios.create();

export { httpClient, httpClientAuth };
