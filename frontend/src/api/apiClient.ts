import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Update to your backend URL
  withCredentials: true, // For cookie-based auth
});

export default apiClient;
