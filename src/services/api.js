// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL:  window.location.hostname === 'www.myassembly.co'
  ? 'https://www.backend.myassembly.co'
  : 'https://127.0.0.1:5000',
//   baseURL: 'https://www.backend.myassembly.co/',
//   withCredentials: true,  // Enable cookies to support sessions, if needed
});



export default api;
