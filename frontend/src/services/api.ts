import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5059/api', // Sesuaikan port backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;