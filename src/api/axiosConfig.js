import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Only attach the Authorization header if a token exists and if it's not a public endpoint
  if (token && !config.url.includes('/api/users/register') && !config.url.includes('/api/authenticate')) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token added to request:', token);
  } else {
    console.warn('No token found or public endpoint accessed.');
  }

  return config;
}, (error) => {
    console.error('Error in request interceptor:', error);
  return Promise.reject(error);
});

export default axiosInstance;