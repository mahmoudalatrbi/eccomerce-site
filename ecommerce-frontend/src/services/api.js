// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; 

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
  getAll: (params) => api.get('api/products/', { params }),
  getById: (slug) => api.get(`api/products/${slug}/`),
  getFeatured: () => api.get('api/products/featured/'),
  getCategories: () => api.get('api/products/categories/'),
};



// إعداد CSRF Token
const getCsrfToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
};

// Cart API
export const cartAPI = {
  // جلب بيانات السلة
  get: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch cart' }));
        throw new Error(errorData.message || 'Failed to fetch cart');
      }

      const result = await response.json();
      return { data: result.data };
    } catch (error) {
      console.error('Cart API get error:', error);
      throw error;
    }
  },

  // إضافة منتج للسلة
  addItem: async (productId, quantity = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add/${productId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to add item' }));
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      const result = await response.json();
      return { data: result.data };
    } catch (error) {
      console.error('Cart API addItem error:', error);
      throw error;
    }
  },

  // تحديث كمية منتج
  updateItem: async (productId, quantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/update/${productId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update item' }));
        throw new Error(errorData.message || 'Failed to update item');
      }

      const result = await response.json();
      return { data: result.data };
    } catch (error) {
      console.error('Cart API updateItem error:', error);
      throw error;
    }
  },

  // حذف منتج من السلة
  removeItem: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/remove/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to remove item' }));
        throw new Error(errorData.message || 'Failed to remove item');
      }

      const result = await response.json();
      return { data: result.data };
    } catch (error) {
      console.error('Cart API removeItem error:', error);
      throw error;
    }
  },

  // مسح السلة
  clear: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/clear/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to clear cart' }));
        throw new Error(errorData.message || 'Failed to clear cart');
      }

      const result = await response.json();
      return { data: result.data };
    } catch (error) {
      console.error('Cart API clear error:', error);
      throw error;
    }
  },

  // جلب عدد العناصر
  getCount: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/count/`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to get cart count');
      }

      return await response.json();
    } catch (error) {
      console.error('Cart API getCount error:', error);
      return { count: 0, total: 0 };
    }
  },
};
export const authAPI = {
  login: (username, password) => 
    api.post('auth/login/', { username, password }),
  refresh: (refresh) => 
    api.post('auth/refresh/', { refresh }),
};

export default api;