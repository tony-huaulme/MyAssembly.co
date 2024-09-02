import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for json-server API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
    getBars() {
        return apiClient.get('/bars');
    },
    getBar(id) {
        return apiClient.get(`/bars/${id}`);
    },
    getReferences() {
        return apiClient.get('/references');
    },
    getReference(id) {
        return apiClient.get(`/references/${id}`);
    },
    getStocks() {
        return apiClient.get('/stocks');
    },
    
};