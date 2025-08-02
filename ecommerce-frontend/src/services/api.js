// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const productsAPI = {
  getAll: (params) => api.get('products/', { params }),
  getById: (slug) => api.get(`products/${slug}/`),
  getFeatured: () => api.get('products/featured/'),
  getCategories: () => api.get('products/categories/'),
};

export const cartAPI = {
  get: () => api.get('cart/'),
  addItem: (productId, quantity = 1) => 
    api.post('cart/', { product_id: productId, quantity }),
  updateItem: (itemId, quantity) => 
    api.put(`cart/items/${itemId}/`, { quantity }),
  removeItem: (itemId) => 
    api.delete(`cart/items/${itemId}/`),
};

export const authAPI = {
  login: (username, password) => 
    api.post('auth/login/', { username, password }),
  refresh: (refresh) => 
    api.post('auth/refresh/', { refresh }),
};

export default api;