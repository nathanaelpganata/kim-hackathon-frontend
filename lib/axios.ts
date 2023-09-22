import axios from 'axios';

export default axios.create({
  baseURL: 'https://hackthon.fly.dev/api',
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: 'https://hackathon.fly.dev/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosAuth.interceptors.request.use((config) => {
  if (!config.headers['Authorization']) {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.error('Access token not found in local storage');
    }
  }
  return config;
});
