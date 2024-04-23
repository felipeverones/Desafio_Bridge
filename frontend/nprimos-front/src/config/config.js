import axios from 'axios';

export const setupAPI = () => {
  const apiBaseURL = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;
    
  axios.defaults.baseURL = apiBaseURL;
}

